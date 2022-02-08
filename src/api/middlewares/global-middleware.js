import express from "express";
import cors from "cors";
import logger from "morgan";
import passport from "passport";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../../config/swagger.json";
import { configurePassportJwtStrategy } from "./passport-jwt";

export const registerGlobalMiddlewares = ( app ) => {
   app.use(express.json());
   app.use(cors());
   app.use(express.urlencoded({ extended: true }))
   app.use(logger('dev'));
   app.use(passport.initialize());
   configurePassportJwtStrategy();
   app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument, { explorer: true }));

};