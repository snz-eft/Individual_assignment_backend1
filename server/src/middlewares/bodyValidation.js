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
  todo: function bodyValidation (req, res, next) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(20).required(),
    });
    const validation = schema.validate(req.body);
    if (validation.error) {
      return res.status(400).json(validation.error.details[0].message);
    }
    next();
  },
  task: function bodyValidation (req, res, next) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(20).required(),
    });
    const validation = schema.validate(req.body);
    if (validation.error) {
      return res.status(400).json(validation.error.details[0].message);
    }
    next();
  },
  taskPatch: function bodyValidation (req, res, next) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(20).required(),
      done: Joi.string().min(1).max(1).required(),
    });
    const validation = schema.validate(req.body);
    if (validation.error) {
      return res.status(400).json(validation.error.details[0].message);
    }
    next();
  },
  friend: function bodyValidation (req, res, next) {
    const schema = Joi.object({
      friend_username: Joi.string().min(3).max(20).required(),
    });
    const validation = schema.validate(req.body);
    if (validation.error) {
      return res.status(400).json(validation.error.details[0].message);
    }
    next();
  },
};
