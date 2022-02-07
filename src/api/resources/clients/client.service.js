import Joi from "joi";

export const validateCreateSchema = ( body ) => {
   const clientSchema = Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
   });
   const { error, value } = clientSchema.validate(body, { abortEarly: false });
   if (error && error.details) {
      return { error }
   }
   return { value };
}