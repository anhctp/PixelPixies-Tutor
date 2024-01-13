from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session
from database import getDatabase
from controllers.userController import UserController, verifyToken
from schemas.userSchema import ConfirmPassword, RegisterUser, Login, UpdateUser
from models.user import UserModel

router = APIRouter(
    tags=["User"],
    responses={404: {"description": "Not found"}},
)


@router.post("/login")
def login(
    request: Login,
    db: Session = Depends(getDatabase),
):
    return UserController.login(request=request, db=db)


@router.post("/register")
def register(user: RegisterUser, db: Session = Depends(getDatabase)):
    return UserController.createUser(user=user, db=db)


@router.post("/logout")
def logout(response: str = Depends(UserController.logout)):
    return response


@router.get("/me")
def get_me(current_user: UserModel = Depends(verifyToken)):
    return current_user


@router.get("/user/all")
def get_all_user(db: Session = Depends(getDatabase)):
    return UserController.getAllUser(db=db)


@router.get("/user/{userId}")
def get_user_by_id(userId: int, db: Session = Depends(getDatabase)):
    return UserController.getUserById(userId=userId, db=db)


@router.put("/user/update/{userId}")
def update_user(userId: int, user: UpdateUser, db: Session = Depends(getDatabase)):
    return UserController.updateUser(userId=userId, user=user, db=db)


@router.delete("/user/delete/{userId}")
def delete_user(
    userId: int, password: ConfirmPassword, db: Session = Depends(getDatabase)
):
    return UserController.deleteUser(userId=userId, password=password, db=db)