from fastapi import Depends
from app.auth.dependencies import get_current_user
from app.models.user import User
from fastapi import APIRouter, UploadFile, File
from app.services.rag_service import build_vector_store
import os

from app.services.pdf_service import extract_pdf_text
from app.services.ai_service import generate_course
from app.config import UPLOAD_FOLDER

router = APIRouter()


@router.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(filepath, "wb") as f:
        f.write(await file.read())

    pdf = extract_pdf_text(filepath)

     # Build the FAISS vector store
    chunks = build_vector_store(pdf["text"])

    course = generate_course(pdf["text"])

    return {
        "filename": file.filename,
        "pages": pdf["pages"],
        "chunks": chunks,
        "course": course
    }