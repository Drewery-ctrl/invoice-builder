import express from 'express';
import * as userController from './user.controller';

export const userRouter = express.Router();

userRouter.post('/signup', userController.signUp)