import express from "express";
import cors from "cors";
import logger from "morgan";
import passport from "passport";
import pdf from "express-pdf";
import session from "express-session";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../../config/swagger.json";
import { devConfig } from "../../config/env/development";
import { configurePassportJwtStrategy } from "./passport-jwt";
import { configureGoogleStrategy } from "./google-passport";
import { configureTwitterStrategy } from "./twitter-passport";

export const registerGlobalMiddlewares = ( app ) => {
   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));
   app.use(cors());
   app.use(pdf);
   app.use(session({
      secret: devConfig.jwt.secret,
      resave: true,
      saveUninitialized: true,
      cookie: {
         maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
      }
   }));
   app.use(logger('dev'));
   app.use(passport.initialize({ userProperty: 'currentUser' }));
   app.use(passport.session());
   configurePassportJwtStrategy();
   configureGoogleStrategy();
   configureTwitterStrategy();
   app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument, { explorer: true }));
};