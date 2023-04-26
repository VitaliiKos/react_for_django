import Joi from "joi";

export const AutoParkValidator = Joi.object({
    name: Joi.string().regex(/^[a-zA-ZА-яёЁіІїЇґҐ]{1,20}$/).required().messages({
        'string.empty':'"name": can\'t be empty',
        'string.pattern.base':'"name": Only letters. min.1 letter max.20 letters',
    }),
})