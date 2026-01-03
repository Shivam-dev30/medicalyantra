from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from ai.analyzer import analyze_report
from ocr.pdf_ocr import extract_pdf_text
from ocr.image_ocr import extract_image_text

app = FastAPI(title="MedicalYantra API")

# ✅ CORS (VERY IMPORTANT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "MedicalYantra API is running. Go to /docs for API documentation."}

@app.post("/analyze")
async def analyze(
    file: UploadFile = File(...),
    language: str = Form("English")
):
    try:
        content = await file.read()

        if not content:
            raise HTTPException(status_code=400, detail="Empty file uploaded")

        if file.filename.lower().endswith(".pdf"):
            text = extract_pdf_text(content)
        else:
            text = extract_image_text(content)

        if not text or len(text.strip()) < 20:
            raise HTTPException(
                status_code=422,
                detail="Unable to extract text from report"
            )

        result = analyze_report(text, language)

        return result  # ✅ frontend expects JSON

    except HTTPException:
        raise

    except Exception as e:
        print("BACKEND ERROR:", e)
        raise HTTPException(
            status_code=500,
            detail="Backend processing failed"
        )
