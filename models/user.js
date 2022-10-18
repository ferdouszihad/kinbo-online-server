const { Schema, model } = require("mongoose");
const Joi = require("joi");
const userSchema = Schema({
  name: {
    type: String,
    minLength: 5,
    maxLength: 10,
    required: true,
  },
  email: {
    type: String,
    minLength: 5,
    maxLength: 25,
    reuired: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 5,
    maxLength: 1024,
    required: true,
  },
  address1:String,
  address2:String,
  city:String,
  state:String,
  zip:String

});

const validateUser = function (user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(10).required(),
    email: Joi.string().min(5).max(25).required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
};

module.exports.User = model("User", userSchema);
module.exports.validateUser = validateUser;

// error.details[0].message
