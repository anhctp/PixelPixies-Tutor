from datetime import datetime, timedelta
from jwt import PyJWTError
import jwt
from sqlalchemy.orm import Session
from database import getDatabase
from fastapi.security import HTTPBearer
from fastapi import Depends, HTTPException, status
from passlib.context import CryptContext
from models.user import UserModel
from schemas.userSchema import ConfirmPassword, RegisterUser, Login, UpdateUser
from dotenv import load_dotenv
import os
from fastapi.security import HTTPBearer

load_dotenv()

# token
reusable_oauth2 = HTTPBearer(scheme_name="Authorization")
token_blacklist = set()


def createAccessToken(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(
        days=int(os.getenv("ACCESS_TOKEN_EXPIRE_DAYS"))
    )
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, os.getenv("SECRET_KEY"), algorithm=os.getenv("ALGORITHM")
    )
    return encoded_jwt


def isTokenInvalidated(token=Depends(reusable_oauth2)):
    if str(token) in token_blacklist:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has been invalidated",
        )
    return True


def verifyToken(db: Session = Depends(getDatabase), data=Depends(reusable_oauth2)):
    try:
        isTokenInvalidated(token=data)
        payload = jwt.decode(
            data.credentials, os.getenv("SECRET_KEY"), algorithms=os.getenv("ALGORITHM")
        )
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate email",
                headers={"WWW-Authenticate": "Bearer"},
            )
        token_data = email
    except PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = UserController.getUserByEmail(email=token_data, db=db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate user",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


# hashing password
pwd_cxt = CryptContext(schemes=["bcrypt"], deprecated="auto")


def bcrypt(password: str):
    return pwd_cxt.hash(password)


def verify(hashed_password, plain_password):
    return pwd_cxt.verify(plain_password, hashed_password)


class UserController:
    def getAllUser(db: Session):
        return db.query(UserModel).all()

    def getUserByEmail(email: str, db: Session = Depends(getDatabase)):
        return db.query(UserModel).filter(UserModel.email == email).first()

    def getUserById(userId: int, db: Session = Depends(getDatabase)):
        return db.query(UserModel).filter(UserModel.id == userId).first()

    def createUser(user: RegisterUser, db: Session = Depends(getDatabase)):
        db_user = UserModel(
            name=user.name,
            email=user.email,
            password=bcrypt(user.password),
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        access_token = createAccessToken(data={"sub": user.email})
        db_user.password = "hashed"
        return {
            "user": db_user,
            "jwtToken": access_token,
        }

    def login(
        request: Login,
        db: Session = Depends(getDatabase),
    ):
        user = db.query(UserModel).filter(UserModel.email == request.email).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail=f"Invalid Credentials"
            )
        if not verify(user.password, request.password):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail=f"Incorrect password"
            )

        access_token = createAccessToken(data={"sub": user.email})

        response = {
            "user": user,
            "jwtToken": access_token,
        }
        return response

    def logout(token: str = Depends(reusable_oauth2)):
        try:
            verifyToken
            token_blacklist.add(str(token))
            return {"msg": "You have been logged out"}
        except PyJWTError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )

    def updateUser(userId: int, user: UpdateUser, db: Session):
        dbUserId = db.query(UserModel).filter(UserModel.id == userId).first()
        if not verify(dbUserId.password, user.currentPass):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail=f"Incorrect password"
            )
        if user.fullname is not None:
            dbUserId.fullname = user.fullname
        if user.email is not None:
            dbUserId.email = user.email
        if user.newPassword is not None:
            dbUserId.password = bcrypt(user.newPassword)
        db.commit()
        return {"msg": "Updated"}

    def deleteUser(userId: int, password: ConfirmPassword, db: Session):
        dbUserId = db.query(UserModel).filter(UserModel.id == userId).first()
        if not verify(dbUserId.password, password.currentPass):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail=f"Incorrect password"
            )
        dbUserId = db.query(UserModel).filter(UserModel.id == userId).first()
        db.delete(dbUserId)
        db.commit()
        return {"msg": "Deleted"}