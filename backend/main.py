from fastapi import FastAPI, UploadFile, File, Form
from ai.analyzer import analyze_report
from ocr.pdf_ocr import extract_pdf_text
from ocr.image_ocr import extract_image_text

app = FastAPI()

@app.post("/analyze")
async def analyze(
    file: UploadFile = File(...),
    language: str = Form("English")
):
    try:
        content = await file.read()

        if file.filename.lower().endswith(".pdf"):
            text = extract_pdf_text(content)
        else:
            text = extract_image_text(content)

        result = analyze_report(text, language)
        return result

    except Exception as e:
        return {
            "error": "Backend processing failed",
            "details": str(e)
        }
