const Joi = require('@hapi/joi');

const authSchema = Joi.object({
    name: Joi.string().lowercase().min(2).required(),
    email: Joi.string().email().required()
});

module.exports = authSchema;