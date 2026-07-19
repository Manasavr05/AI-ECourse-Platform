from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database import Base


class LearningHistory(Base):
    __tablename__ = "learning_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    file_name = Column(String)
    course_title = Column(String)

    progress = Column(Integer, default=0)
    quiz_score = Column(Integer, default=0)

    completed = Column(Boolean, default=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())