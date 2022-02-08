import express from 'express';
import * as userController from './user.controller';

export const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);
userRouter.post('/login', userController.login);
userRouter.post('/signup', userController.signUp)