from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User

SECRET_KEY = "change_this_to_a_long_random_secret_key"
ALGORITHM = "HS256"

security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    print("\n========== AUTH DEBUG ==========")

    token = credentials.credentials
    print("Received Token:")
    print(token)

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        print("Decoded Payload:")
        print(payload)

        email = payload.get("sub")
        print("Email from Token:", email)

        if email is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid Token",
            )

    except JWTError as e:
        print("JWT Decode Error:")
        print(str(e))

        raise HTTPException(
            status_code=401,
            detail="Invalid Token",
        )

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    print("Database User:")
    print(user)

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="User not found",
        )

    print("Authentication Successful")
    print("================================\n")

    return user