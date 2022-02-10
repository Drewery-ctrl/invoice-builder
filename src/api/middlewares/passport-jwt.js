import { devConfig } from "../../config/env/development";
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import UserModel from '../resources/users/user.model';

require('dotenv').config();

export const configurePassportJwtStrategy = () => {
   const opts = {}
   opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
   opts.secretOrKey = devConfig.jwt.secret;
   passport.use(new Strategy(opts, ( jwt_payload, done ) => {
      UserModel.findOne({ _id: jwt_payload.id }, ( err, user ) => {
         if (err) {
            return done(err, false);
         }
         if (user) {
            return done(null, user);
         }
         else {
            return done(null, false);
            // or you could create a new account
         }
      });
   }));
}