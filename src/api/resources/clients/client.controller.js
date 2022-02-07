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
   try {
      const clients = await ClientModel.find();
      return res.status(httpStatus.OK).json({ clients });
   }
   catch (err) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
         message: err.message
      });
   }
};

export const getClient = async ( req, res ) => {
   try {
      const client = await ClientModel.findById(req.params.id);
      return res.status(httpStatus.OK).json({ client });
   }
   catch (err) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
         message: err.message
      });
   }
};

export const updateClient = async ( req, res ) => {
   return res.json('update client');
};

export const deleteClient = async ( req, res ) => {
   return res.json('delete client');
};