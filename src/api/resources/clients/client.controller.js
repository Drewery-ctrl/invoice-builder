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
      if (!client) {
         return res.status(httpStatus.NOT_FOUND).json({
            message: 'find error: client not found'
         });
      }
      return res.status(httpStatus.OK).json({ client });
   }
   catch (err) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
         message: err.message
      });
   }
};

export const updateClient = async ( req, res ) => {
   try {
      const { error, value } = clientService.validateUpdateSchema(req.body);
      if (error && error.details) {
         return res.status(httpStatus.BAD_REQUEST).json(error.details[0].message);
      }
      const client = await ClientModel.findByIdAndUpdate(req.params.id, value, { new: true });
      if (!client) {
         return res.status(httpStatus.NOT_FOUND).json({
            message: 'update error: client not found'
         });
      }
      return res.status(httpStatus.OK).json({ client });
   }
   catch (err) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
         message: err.message
      });
   }
};

export const deleteClient = async ( req, res ) => {
   try {
      const client = await ClientModel.findById(req.params.id);
      if (!client) {
         return res.status(httpStatus.NOT_FOUND).json({
            message: 'delete error: client not found'
         });
      }
      await client.remove();
      return res.status(httpStatus.OK).json({ message: 'Client deleted', client });
   }
   catch (err) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
         message: err.message
      });
   }
};