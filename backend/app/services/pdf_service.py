import fitz


def extract_pdf_text(filepath):
    document = fitz.open(filepath)

    text = ""

    for page in document:
        text += page.get_text()

    page_count = len(document)
    document.close()

    return {
        "pages": page_count,
        "text": text
    }