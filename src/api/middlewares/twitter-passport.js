import passport from 'passport';
import TwitterStrategy from 'passport-twitter';
import { devConfig } from '../../config/env/development';
import User from '../resources/users/user.model';

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
export const configureTwitterStrategy = () => {
   passport.use(
      new TwitterStrategy.Strategy(
         {
            consumerKey: devConfig.twitter.api_key,
            consumerSecret: devConfig.twitter.api_key_secret,
            callbackURL: devConfig.twitter.callbackURL,
         },
         async ( token, tokenSecret, profile, done ) => {
            try {
               console.log('accessToken: ', token);
               console.log('refreshToken: ', tokenSecret);
               console.log('profile: ', profile);

               // find the user by twitter id
               const user = await User.findOne({ 'twitter.id': profile.id });
               console.log(profile);
               if (user) {
                  return done(null, user);
               }
               const newUser = new User({});
               newUser.twitter.id = profile.id;
               newUser.twitter.token = token;
               newUser.twitter.displayName = profile.displayName;
               newUser.twitter.username = profile.username;
               await newUser.save();
               return done(null, newUser);
            }
            catch (err) {
               console.error(err);
               return done(err);
            }
         }
      )
   );

   // save user to session
   passport.serializeUser(( user, done ) => {
      done(null, user._id);
   });

   passport.deserializeUser(( id, done ) => {
      User.findOneAndUpdate({ _id: id }, { $set: { lastLogin: new Date() } }, { new: true }, ( err, user ) => {
         done(err, user);
      });
   });
};