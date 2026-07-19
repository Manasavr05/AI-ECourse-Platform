from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
import os
import traceback

from app.auth.dependencies import get_current_user
from app.models.user import User
from app.database import get_db
from app.models.history import LearningHistory

from app.services.pdf_service import extract_text_from_pdf
from app.services.rag_service import build_vector_store
from app.services.ai_service import generate_course
from app.config import UPLOAD_FOLDER

router = APIRouter()


@router.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        print("STEP 1: Saving PDF")

        filepath = os.path.join(UPLOAD_FOLDER, file.filename)

        with open(filepath, "wb") as f:
            f.write(await file.read())

        print("Saved:", filepath)
        print("File size:", os.path.getsize(filepath), "bytes")

        print("STEP 2: Extracting text")

        text = extract_text_from_pdf(filepath)

        print("Text length:", len(text))
        print("Preview:", repr(text[:300]))

        if not text.strip():
            raise ValueError("No text extracted from the PDF.")

        print("STEP 3: Building vector store")

        chunks = build_vector_store(text)

        print("Chunks:", chunks)

        print("STEP 4: Generating AI course")

        course = generate_course(text)

        print("STEP 5: Saving history")

        history = LearningHistory(
            user_id=current_user.id,
            file_name=file.filename,
            course_title=course["title"],
            progress=0,
            quiz_score=0,
            completed=False,
        )

        db.add(history)
        db.commit()
        db.refresh(history)

        print("STEP 6: Returning response")

        return {
            "filename": file.filename,
            "text_length": len(text),
            "chunks": chunks,
            "course": course,
            "history_id": history.id,
        }

    except Exception:
        print("\n========== ERROR ==========")
        traceback.print_exc()
        print("===========================\n")

        raise HTTPException(
            status_code=500,
            detail="PDF processing failed.",
        )