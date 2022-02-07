import express from 'express';
import * as clientController from './client.controller';

export const clientRouter = express.Router();

clientRouter.route('/')
.get(clientController.getAllClients)
.post(clientController.createClient);

clientRouter.route('/:id')
.get(clientController.getClient)