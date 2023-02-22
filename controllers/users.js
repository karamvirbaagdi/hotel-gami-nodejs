const users = require("../models/users");
const Joi = require("joi");
const { json } = require("express");
const jwt = require("jsonwebtoken");

function validateUser(user) {
  const JoiSchema = Joi.object({
    name: Joi.string().required(),

    email: Joi.string().email().required(),

    password: Joi.string().optional(),

    phone: Joi.number().optional(),
  }).options({ abortEarly: false });

  return JoiSchema.validate(user);
}
function createJsonWebToken(user) {
  const newToken = jwt.sign({ name: user.name, email: user.email }, "sh123", {
    expiresIn: "365d",
  });
  return newToken;
}
function validateUserLogin(user) {
  const JoiSchema = Joi.object({
    email: Joi.string().email().required(),

    password: Joi.string().optional(),
  }).options({ abortEarly: false });

  return JoiSchema.validate(user);
}

const userLogin = async (req, res) => {
  const user = req.body;

  response = validateUserLogin(user);

  if (response.error) {
    const valdateError = response.error.details;

    res.json({ message: valdateError, sucess: false });
  } else {
    const userEmail = user.email;
    const userPassword = user.password;

    const checkEmail = await users.find({ Email: userEmail });
    if (checkEmail) {
      const checkEmailPass = await users.find({
        Email: userEmail,
        password: userPassword,
      });
      if (checkEmailPass) {
        res.json({ Message: "User login sucessfully.", status: 200 });
      } else {
        res.json({
          Message: "password not match please check again,",
          status: 400,
        });
      }
    } else {
      res.json({ Message: "Email not match please check again.", status: 404 });
    }
  }
};
//User Register fucntion
const userRegister = async (req, res, next) => {
  const user = req.body;

  response = validateUser(user);

  if (response.error) {
    const valdateError = response.error.details;

    res.json({ message: valdateError, sucess: false });
  } else {
    const token = createJsonWebToken(user);
    const userName = user.name;
    const userEmail = user.email;
    const userPassword = user.password;
    const userPhone = user.phone;

    const createUser = new users({
      Name: userName,
      Email: userEmail,
      password: userPassword,
      phoneNumber: userPhone,
      Token: token,
    });

    const saveUser = await createUser.save();

    if (saveUser) {
      res.json({
        message: "User Added sucessffully",
        sucess: true,
        status: 200,
      });
    }
  }
};

const userDelete = async (req, res) => {
  const UserId = req.params.id;
  const checkUser = await users.find({ _id: UserId });
  if (checkUser) {
    const deleteUser = await users.deleteOne({ _id: UserId });
    if (deleteUser) {
      res.json({ status: 200, message: "User deleted sucessfully." });
    } else {
      res.json({ status: 409, message: "User not delete." });
    }
  } else {
    res.json({ status: 400, message: "User not found." });
  }
};

const userList = async (req, res) => {
  const userData = await users.find();

  res.json({ data: userData });
};
const userCount = async (req, res) => {
  try {
    const userData = await users.count();
    if (userData) {
      res.json({ status: 200, data: userData });
    } else {
      res.json({ status: 400 });
    }
  } catch (e) {
    res.json({ status: 400 });
  }
};

module.exports = { userRegister, userDelete, userList, userLogin, userCount };
