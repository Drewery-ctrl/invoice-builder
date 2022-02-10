import UserModel from './user.model';
import httpStatus from 'http-status-codes'
import bcryptjs from 'bcryptjs'
import * as UserService from './user.service';

export const signUp = async ( req, res ) => {
   try {
      // Validate Incoming User Request
      const { email } = req.body;
      const { error, value } = UserService.validateSchema(req.body);
      if (error && error.details) {
         return res.status(httpStatus.BAD_REQUEST).json({ error: error.details[0].message });
      }
      const user = await UserModel.findOne({ email });
      if (user) {
         return res.status(httpStatus.BAD_REQUEST).json({
            error: 'User already exists',
         });
      }
      await UserModel.create(value);
      setTimeout(() => {
         return res.status(httpStatus.CREATED).json({ success: true, message: 'User created successfully' });
      }, 500);
   }
   catch (error) {
      console.log(error);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
         error: error.message
      });
   }
};

export const getAllUsers = async ( req, res ) => {
   try {
      const users = await UserModel.find();
      return res.status(httpStatus.OK).json({ users });
   }
   catch (error) {
      console.log(error);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
         error: error.message
      });
   }
};

export const login = async ( req, res ) => {
   try {
      const { error, value } = UserService.validateSchema(req.body);
      if (error && error.details) {
         return res.status(httpStatus.BAD_REQUEST).json({
            error: error.details[0].message
         });
      }
      const user = await UserModel.findOne({ email: value.email });
      if (!user) {
         console.log('User not found');
         return res.status(httpStatus.BAD_REQUEST).json({ error: 'Invalid username or password' });
      }
      const isValidPassword = await bcryptjs.compare(value.password, user.password);
      if (!isValidPassword) {
         console.log('Invalid password');
         return res.status(httpStatus.UNAUTHORIZED).json({ error: 'Invalid username or password' });
      }

      const token = await UserService.generateToken(user);
      setTimeout(() => {
         return res.status(httpStatus.OK).json({ success: true, token });
      }, 500);
   }
   catch (error) {
      console.log(error);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
         error: error.message
      });
   }
};

export const getLoggedInUser = async ( req, res ) => {
   try {
      return res.status(httpStatus.OK).json({ success: true, message: 'Test Successful', user: req.user });
   }
   catch (error) {
      console.log(error);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
   }
};