require('dotenv').config();
import Joi from "joi";
import jwt from "jsonwebtoken";

export const validateSchema = ( body ) => {
   const clientSchema = Joi.object().keys({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
   });
   const { error, value } = clientSchema.validate(body, { abortEarly: false });
   if (error && error.details) {
      return { error }
   }
   return { value };
}

export const generateToken = ( user ) => {
   return jwt.sign({ id: user._id }, `${process.env.JWT_SECRET}`, { expiresIn: '1h' });
}