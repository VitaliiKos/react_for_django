import Joi from "joi";

export const CarValidator = Joi.object({
    brand: Joi.string().regex(/^[a-zA-ZА-яёЁіІїЇґҐ]{1,20}$/).required().messages({
        'string.empty':'"brand": can\'t be empty',
        'string.pattern.base':'"brand": Only letters. min.1 letter max.20 letters',
    }),
    price: Joi.number().min(0).max(1000000).required().messages({
        'number.base':'min.price <= 1 max.price >= 1000000',
        'number.min':'price must be more than 0',
        'number.max':'price must be less than 1000000',
    }),
    year: Joi.number().min(1990).max(new Date().getFullYear()).required().messages({
        'number.base':'min.year - 1990 max.year - now'
    }),
})