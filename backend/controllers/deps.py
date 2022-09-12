from typing import Generator
from db.sessoin import SessionLocal
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import Depends, HTTPException, status
import models
from jose import jwt, JWTError
from sqlalchemy.orm import Session
import crud

security = HTTPBearer()

# TODO : ENV 파일로 분리
# openssl rand -hex 32
SECRET_KEY = "d80b71594f3a92b9098914874174e13aff10d3936068689399a0d9c9fa35003f"
ALGORITHM = "HS256"


def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


def get_current_user(
    db: Session = Depends(get_db),
    token: HTTPAuthorizationCredentials = Depends(security)
) -> models.User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )

    try:
        token_data = jwt.decode(token.credentials, SECRET_KEY, algorithms=ALGORITHM)
    except JWTError:
        raise credentials_exception

    user = crud.user.get(db, id=token_data["id"])
    if not user:
        raise credentials_exception
    return user


def check_admin_user(
    current_user: models.User = Depends(get_current_user)
) -> models.User:
    if current_user.type.value != 'admin':
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="The user doesn't have enough privileges",
        )
    return current_user
