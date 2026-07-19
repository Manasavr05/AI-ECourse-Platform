import fitz
import pytesseract
from PIL import Image

# Path to Tesseract OCR
pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)


def extract_text_from_pdf(pdf_path):
    """
    Extract text from a PDF.
    1. Try normal text extraction using PyMuPDF.
    2. If no text exists, automatically use OCR.
    """

    doc = fitz.open(pdf_path)

    print("=" * 60)
    print("Pages:", len(doc))

    full_text = ""

    for page_num, page in enumerate(doc):

        print(f"\nProcessing Page {page_num + 1}")

        # -----------------------------
        # Method 1 : PyMuPDF Extraction
        # -----------------------------
        text = page.get_text("text")

        if text and text.strip():
            print("✅ Text extracted using PyMuPDF")
            print("Characters:", len(text))
            full_text += text
            continue

        # -----------------------------
        # Method 2 : OCR Fallback
        # -----------------------------
        print("⚠ No embedded text found.")
        print("Running OCR...")

        # Convert PDF page to high-resolution image
        pix = page.get_pixmap(matrix=fitz.Matrix(3, 3))

        image = Image.frombytes(
            "RGB",
            [pix.width, pix.height],
            pix.samples
        )

        # OCR
        ocr_text = pytesseract.image_to_string(image, lang="eng")

        print("OCR Characters:", len(ocr_text))
        print("Preview:", repr(ocr_text[:200]))

        full_text += ocr_text

    doc.close()

    print("=" * 60)
    print("Total Characters Extracted:", len(full_text))

    return full_text