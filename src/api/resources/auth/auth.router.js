import express from 'express';

export const authRouter = express.Router();

authRouter.route('/').get((req, res) => {
  res.send('Auth Router Works!!');
});