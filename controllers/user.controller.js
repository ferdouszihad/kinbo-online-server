const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { User, validateUser } = require("../models/user");
const bcrypt = require("bcrypt");

module.exports.signUp = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error)
    return res.status(400).send({
      status: false,
      message: error.details[0].message,
    });
  let user = await User.findOne(_.pick(req.body, ["email"]));
  if (user)
    return res.status(400).send({
      status: false,
      message: "User already exits!",
    });
  user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  try {
    const result = await user.save();
    return res.status(200).send({
      status: true,
      data: result,
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      message: "Registration failed",
    });
  }
};

module.exports.signIn = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({
      status: false,
      message: "Please sign up!",
    });

  const validUser = await bcrypt.compare(req.body.password, user.password);

  if (!validUser)
    return res.status(400).send({
      status: false,
      message: "Wrong password!",
    });

  const token = jwt.sign(
    _.pick(user, ["_id", "name", "email"]),
    process.env.SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );

  return res.status(200).send({
    status: true,
    token: token,
    user,
  });
};

module.exports.updateUser = async (req, res) => {
  const _id = req.user._id;
  const result = await User.updateOne({ _id: _id }, req.body);
  res.status(200).send({
    status: true,
  });
};


module.exports.getUsers = async(req,res) =>{
   const result = await User.find();

   res.status(200).send(result)
}