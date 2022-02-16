import { devConfig } from "../../../config/env/development";
import Joi from "joi";
import jwt from "jsonwebtoken";

require('dotenv').config();

export const ValidateSignupSchema = ( body ) => {
   const clientSchema = Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
   });
   const { error, value } = clientSchema.validate(body, { abortEarly: false });
   if (error && error.details) {
      return { error }
   }
   return { value };
}

export const validateLoginSchema = ( details ) => {
   const clientSchema = Joi.object().keys({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
   });
   const { error, value } = clientSchema.validate(details, { abortEarly: false });
   if (error && error.details) {
      return { error }
   }
   return { value };
}


export const generateToken = ( user ) => {
   return jwt.sign({ id: user._id }, devConfig.jwt.secret, { expiresIn: '1d' });
}

export const getUser = ( user ) => {
   const rsp = {};
   if (user.local.email) {
      rsp.name = user.local.name;
      rsp.email = user.local.email;
   }
   if (user.google.email) {
      rsp.name = user.google.displayName;
      rsp.email = user.google.email;
   }
   if (user.github.email) {
      rsp.name = user.github.displayName;
      rsp.email = user.github.email;
   }
   if (user.twitter.email) {
      rsp.name = user.twitter.displayName;
      rsp.email = user.twitter.email;
   }
   return rsp;
}