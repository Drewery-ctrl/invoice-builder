import express from 'express';
import passport from 'passport';
import * as userController from './user.controller';

export const userRouter = express.Router();

userRouter.get('/', passport.authenticate('jwt', { session: false }), userController.getAllUsers);
userRouter.post('/login', userController.login);
userRouter.post('/signup', userController.signUp);
userRouter.post('/passport', passport.authenticate('jwt', { session: false }), userController.getLoggedInUser);