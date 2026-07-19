from app.api.auth import router as auth_router
from app.database import Base, engine
from app.models import User, LearningHistory
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.history import router as history_router
from app.api.upload import router as upload_router
from app.api.tutor import router as tutor_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI E-Course API",
    description="Backend API for AI-powered PDF to E-Course Learning Platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:3000",
    "https://ai-e-course-platform.vercel.app",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "AI E-Course Backend is running"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }



app.include_router(upload_router)
app.include_router(tutor_router)
app.include_router(auth_router)
app.include_router(history_router)