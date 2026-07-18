from fastapi import Depends
from app.auth.dependencies import get_current_user
from app.models.user import User
from fastapi import APIRouter
from pydantic import BaseModel

from app.services.rag_service import search_context
from app.services.ai_service import client

router = APIRouter()


class ChatRequest(BaseModel):
    question: str


@router.post("/chat")
def chat(
    request: ChatRequest,
    current_user: User = Depends(get_current_user)
):


    context = search_context(request.question)

    if not context:
        return {
            "answer": "Please upload a PDF first."
        }

    prompt = f"""
You are an AI Tutor.

Answer ONLY using the context below.

If the answer is not found in the context, reply exactly:

I couldn't find that information in the uploaded PDF.

Context:
{context}

Question:
{request.question}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2,
    )

    return {
        "answer": response.choices[0].message.content
    }