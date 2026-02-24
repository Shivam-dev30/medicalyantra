import pytesseract
from PIL import Image
from io import BytesIO

def extract_image_text(image_bytes):
    try:
        image = Image.open(BytesIO(image_bytes))
        return pytesseract.image_to_string(image)
    except Exception as e:
        if "tesseract is not installed" in str(e).lower() or "no such file" in str(e).lower():
            raise RuntimeError("Tesseract-OCR not found on system. Please install it or upload a PDF instead.")
        raise e
