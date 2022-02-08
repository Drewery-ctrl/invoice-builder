require('dotenv').config();
import passport from 'passport';
import PassportJWT from 'passport-jwt';
import UserModel from '../resources/users/user.model';

export const configurePassportJwtStrategy = () => {
   const opts = {}
   opts.jwtFromRequest = PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
   opts.secretOrKey = `${ process.env.JWT_SECRET }`;
   passport.use(new PassportJWT.Strategy(opts, function ( jwt_payload, done ) {
      UserModel.findOne({ id: jwt_payload.sub }, function ( err, user ) {
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