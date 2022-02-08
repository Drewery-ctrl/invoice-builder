import express from 'express';
import * as clientController from './client.controller';
import passport from "passport";

export const clientRouter = express.Router();

clientRouter.route('/')
   .get(passport.authenticate('jwt', { session: false }), clientController.getAllClients)
   .post(passport.authenticate('jwt', { session: false }), clientController.createClient);

clientRouter.route('/:id')
   .get(passport.authenticate('jwt', { session: false }), clientController.getClient)
   .put(passport.authenticate('jwt', { session: false }), clientController.updateClient)
   .delete(passport.authenticate('jwt', { session: false }), clientController.deleteClient);