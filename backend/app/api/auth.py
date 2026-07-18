from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import traceback

from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin
from app.auth.hashing import hash_password, verify_password
from app.auth.jwt_handler import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    try:
        print("Register endpoint called")

        existing_user = db.query(User).filter(
            User.email == user.email
        ).first()

        print("Checked existing user")

        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="Email already exists"
            )

        print("Hashing password")

        new_user = User(
            name=user.name,
            email=user.email,
            password=hash_password(user.password)
        )

        print("Adding user to database")

        db.add(new_user)

        print("Committing...")

        db.commit()

        print("Refreshing...")

        db.refresh(new_user)

        print("Registration successful!")

        return {
            "message": "User registered successfully"
        }

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(user.password, db_user.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
        {"sub": db_user.email}
    )

    return {
        "message": "Login successful",
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "name": db_user.name,
            "email": db_user.email
        }
    }