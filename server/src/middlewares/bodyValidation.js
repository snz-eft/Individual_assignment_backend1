const Joi = require('joi');

exports.bodyValidation = {
  authentication: function bodyValidation (req, res, next) {
    const schema = Joi.object({
      username: Joi.string().min(3).max(20).required(),
      password: Joi.string().min(3).max(15).required(),
    });
    const validation = schema.validate(req.body);
    if (validation.error) {
      return res.status(400).json(validation.error.details[0].message);
    }
    next();
  },
};
