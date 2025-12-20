from dotenv import load_dotenv
load_dotenv()

import os
import json
from groq import Groq
from groq import BadRequestError

api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise RuntimeError("GROQ_API_KEY not found")

client = Groq(api_key=api_key)

SYSTEM_PROMPT = """
You are a medical lab report analysis assistant.

STRICT RULES:
- Do NOT diagnose diseases
- Do NOT prescribe medicines
- Use phrases like "may indicate", "possible risk"
- Suggest consulting a qualified doctor
- Provide Ayurvedic food & lifestyle guidance only
- Be patient-friendly
- Return ONLY valid JSON
"""

def analyze_report(report_text, language="English"):
    # 🔴 SAFETY CHECK 1: EMPTY OCR
    if not report_text or len(report_text.strip()) < 50:
        return {
            "error": "Unable to extract readable text from report",
            "hint": "Please upload a clearer PDF or image",
            "raw_length": len(report_text or "")
        }

    # 🔴 SAFETY CHECK 2: LIMIT TEXT SIZE (VERY IMPORTANT)
    report_text = report_text[:6000]

    user_prompt = f"""
Analyze the following medical lab report.

Return ONLY valid JSON with:
- overall_status
- issues_detected (parameter, value, normal_range, issue, risk_level)
- modern_medical_insights
- ayurvedic_guidance
- lifestyle_recommendations
- when_to_see_doctor
- disclaimer

Respond in {language} language.

Lab Report:
{report_text}
"""

    try:
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            temperature=0.2,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt}
            ]
        )

        raw_output = completion.choices[0].message.content.strip()

        # 🔍 LOG OUTPUT (DEBUG)
        print("----- RAW LLaMA OUTPUT -----")
        print(raw_output)
        print("---------------------------")

        # 🛡️ SAFE JSON EXTRACTION
        json_start = raw_output.find("{")
        json_end = raw_output.rfind("}") + 1

        if json_start == -1 or json_end == -1:
            return {
                "error": "AI did not return JSON",
                "raw_output": raw_output
            }

        clean_json = raw_output[json_start:json_end]
        return json.loads(clean_json)

    except BadRequestError as e:
        return {
            "error": "Groq request failed",
            "details": str(e)
        }

    except Exception as e:
        return {
            "error": "Unexpected server error",
            "details": str(e)
        }
