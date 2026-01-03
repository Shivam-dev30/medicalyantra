from dotenv import load_dotenv
load_dotenv()

import os
import json
from groq import Groq
from groq import BadRequestError

# Initialize client lazily to avoid startup crash if key is missing
def get_groq_client():
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise RuntimeError("GROQ_API_KEY not found in environment variables")
    return Groq(api_key=api_key)

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
        client = get_groq_client()
        completion = client.chat.completions.create(
            model="llama3-8b-8192",
            temperature=0.2,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt}
            ],
            response_format={"type": "json_object"}
        )

        raw_output = completion.choices[0].message.content.strip()

        # 🛡️ SAFE JSON EXTRACTION
        json_start = raw_output.find("{")
        json_end = raw_output.rfind("}") + 1

        if json_start == -1 or json_end == -1:
            return {
                "error": "AI response format error",
                "details": "AI failed to generate a valid JSON structure."
            }

        clean_json = raw_output[json_start:json_end]
        return json.loads(clean_json)

    except Exception as e:
        error_msg = str(e)
        print(f"GROQ ERROR: {error_msg}")
        return {
            "error": "AI Analysis Failed",
            "details": error_msg
        }
