import express from 'express';
import passport from 'passport';
import authController from "./auth.controller";

export const authRouter = express.Router();

authRouter.route('/').get(( req, res ) => {
   res.send('Auth Router Works!!');
});


authRouter.get('/failed', ( req, res ) => {
   console.log('failed');
   res.redirect('http://localhost:4200/login');
});

authRouter.get('/success', ( req, res ) => {
   console.log('authenticated:', req.isAuthenticated());
   res.send(`Successfully authenticated ${ req.currentUser }`);
});

//  Google Routes
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/callback',
   passport.authenticate('google', { failureRedirect: '/failed' }),
   authController.sendJWTToken
);


// Twitter Routes
authRouter.get('/twitter', passport.authenticate('twitter'));

authRouter.get('/twitter/callback',
   passport.authenticate('twitter', { failureRedirect: '/failed', failureMessage: true }),
   authController.sendJWTToken
);