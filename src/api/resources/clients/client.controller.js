import * as clientService from './client.service';
import httpStatus from 'http-status-codes';
import ClientModel from './client.model';

export const createClient = async ( req, res ) => {
   try {
      const { error, value } = clientService.validateCreateSchema(req.body);
      if (error && error.details) {
         return res.status(httpStatus.BAD_REQUEST).json(error.details[0].message);
      }
      const client = await ClientModel.create(value);
      return res.status(httpStatus.CREATED).json({ client })
   }
   catch (err) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
         message: err.message
      });
   }
};

export const getAllClients = async ( req, res ) => {
   return res.json('get all clients');
};

export const getClient = async ( req, res ) => {
   return res.json('get client');
};

export const updateClient = async ( req, res ) => {
   return res.json('update client');
};

export const deleteClient = async ( req, res ) => {
   return res.json('delete client');
};