import pytesseract
from PIL import Image
from io import BytesIO

def extract_image_text(image_bytes):
    image = Image.open(BytesIO(image_bytes))
    return pytesseract.image_to_string(image)
