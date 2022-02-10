import express from 'express';
import passport from 'passport';

export const authRouter = express.Router();

authRouter.route('/').get(( req, res ) => {
   res.send('Auth Router Works!!');
});


authRouter.get('/failed', ( req, res ) => {
   res.send('Failed to authenticate');
});

authRouter.get('/success', ( req, res ) => {
   res.send(`Successfully authenticated ${ req.currentUser }`);
});

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
   function ( req, res ) {
      res.redirect('/api/v1/auth/success');
   });
