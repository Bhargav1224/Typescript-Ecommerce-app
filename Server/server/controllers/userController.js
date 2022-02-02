const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds);
}

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

exports.signup = async (req, res, next) => {
  try {
    const { role, email, password, firstName, lastName } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      // role: role || "basic",
    });
    newUser.accessToken = "";
    await newUser.save();
    res.status(200).json({
      code: 1001,
      data: newUser,
      message: "You have signed up successfully",
    });
  } catch (error) {
    let errorMessage;
    if (error.code === 11000) {
      errorMessage = "Email already exist";
    } else {
      errorMessage = error;
    }
    res.json({
      code: 1002,
      message: errorMessage,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    // .populate("role");
    if (!user) {
      return res.json({
        code: 1003,
        message: "Email does not exist",
      });
    }
    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) {
      return res.json({
        code: 1003,
        message: "Password is not correct",
      });
    }
    const accessToken = jwt.sign(
      // role: user.role
      { userId: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      }
    );
    await User.findByIdAndUpdate(user._id, { accessToken });
    res.status(200).json({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        // role: user.role,
      },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};
