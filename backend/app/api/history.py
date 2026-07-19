from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.history import LearningHistory
from app.models.user import User
from app.auth.dependencies import get_current_user

router = APIRouter(
    prefix="/history",
    tags=["Learning History"],
)


@router.post("/create")
def create_history(
    file_name: str,
    course_title: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    history = LearningHistory(
        user_id=current_user.id,
        file_name=file_name,
        course_title=course_title,
        progress=0,
        quiz_score=0,
        completed=False,
    )

    db.add(history)
    db.commit()
    db.refresh(history)

    return history


@router.get("/")
def get_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    history = (
        db.query(LearningHistory)
        .filter(LearningHistory.user_id == current_user.id)
        .order_by(LearningHistory.created_at.desc())
        .all()
    )

    return history


@router.put("/{history_id}")
def update_history(
    history_id: int,
    progress: Optional[int] = None,
    quiz_score: Optional[int] = None,
    completed: Optional[bool] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    history = (
        db.query(LearningHistory)
        .filter(
            LearningHistory.id == history_id,
            LearningHistory.user_id == current_user.id,
        )
        .first()
    )

    if not history:
        raise HTTPException(
            status_code=404,
            detail="History not found",
        )

    if progress is not None:
        history.progress = progress

    if quiz_score is not None:
        history.quiz_score = quiz_score

    if completed is not None:
        history.completed = completed

    db.commit()
    db.refresh(history)

    return history


@router.delete("/{history_id}")
def delete_history(
    history_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    history = (
        db.query(LearningHistory)
        .filter(
            LearningHistory.id == history_id,
            LearningHistory.user_id == current_user.id,
        )
        .first()
    )

    if not history:
        raise HTTPException(
            status_code=404,
            detail="History not found",
        )

    db.delete(history)
    db.commit()

    return {"message": "Learning history deleted successfully"}