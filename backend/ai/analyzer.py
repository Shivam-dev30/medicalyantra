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

def get_best_model(client):
    """
    Dynamically fetches available models from Groq and picks the best 
    supported Llama model to avoid 'decommissioned model' errors.
    """
    try:
        # Get list of models from API
        models = client.models.list()
        available_ids = [m.id for m in models.data]
        
        # Preference list — production-grade models only (no decommissioned ones)
        preferences = [
            "llama-3.3-70b-versatile",         # Best quality, production
            "meta-llama/llama-4-scout-17b-16e-instruct",  # Fast Llama 4, preview
            "meta-llama/llama-4-maverick-17b-128e-instruct",  # Llama 4 Maverick
            "llama-3.1-8b-instant",            # Fast, production
            "qwen/qwen3-32b",                  # Alibaba, preview
            "gemma2-9b-it",                    # Google, fallback
        ]
        
        for model_id in preferences:
            if model_id in available_ids:
                return model_id
                
        # Default fallback if list is empty or unexpected
        return available_ids[0] if available_ids else "llama-3.1-8b-instant"
        
    except Exception as e:
        print(f"Error fetching models: {e}")
        return "llama-3.1-8b-instant" # Safe hardcoded fallback 

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
        active_model = get_best_model(client)
        print(f"Using Groq Model: {active_model}")

        completion = client.chat.completions.create(
            model=active_model,
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
        
        if "401" in error_msg or "invalid_api_key" in error_msg:
            return {
                "error": "Invalid Groq API Key",
                "details": "The API key in backend/.env is invalid. Get a new one at https://console.groq.com/keys"
            }
            
        return {
            "error": "AI Analysis Failed",
            "details": error_msg
        }
