require('dotenv').config();
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import UserModel from '../resources/users/user.model';

export const configurePassportJwtStrategy = () => {
   const opts = {}
   opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
   opts.secretOrKey = `${ process.env.JWT_SECRET }`;
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