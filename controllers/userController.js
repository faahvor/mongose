import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { OTPgenerator } from "../lib/OTPgenerator.js";

dotenv.config();

//register
export const createUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const { role } = req.params;
    const user = new User(req.body);

    // Check If User Exists In The Database
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    //amount of times salts are generated into the password, makes it harder to crack
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user.password = hashedPassword;
    if (role === "admin" || role === "staff" || role === "user") {
      user.role = role;
      await user.save();
      res.status(201).json({
        status: "success",
        message: `${user.role} created successfully`,
      });
    } else {
      user.role = "user";
      await user.save();
      res.status(201).json({
        status: "success",
        message: `${user.role} created successfully`,
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
//login page
export const userLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    //check for password and username
    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: "please provide username and password" });
    }
    //check if user exist in database
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(401).json({ message: "invalid credentails" });
    }
    //compare passwords
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(401).json({ message: "invalid password" });
    }
    console.log(process.env.JWT_SECRET_KEY)
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      status: "success",
      message: `${user.role} logged in successfully`,
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "an error occurred when connecting",
    });
    console.log(error)
  }
};
//change password
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { userName } = req.params;
    if (!userName) {
      return res.status(400).json({ message: "please input username" });
    } else if (newPassword === oldPassword) {
      return res.status(400).json({
        message: "please old password can't be the same with new password ",
      });
    }
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: "user doesn't exist" });
    }
    const isCorrectPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isCorrectPassword) {
      return res
        .status(400)
        .json({ message: "old password doesnt match database password" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    user.password = hashedPassword;
    await user.save();
    res.status(200).json({
      status: "success",
      message: "password successfully changed",
    });
  } catch (err) {
    return res.status(500).json({ message: "couldn't change password" });
  }
};

//change username
export const changeUsername = async (req, res) => {
  try {
    const { newUserName } = req.body;
    const { userName } = req.params;
    if (newUserName === userName) {
      return res.status(400).json({
        message: "username cant be the same thing with the previous username",
      });
    }
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: "username doesn't exist" });
    }

    user.userName = newUserName;
    await user.save();
    res.status(200).json({
      status: "success",
      message: "username succefully changed",
    });
  } catch (err) {
    return res.status(500).json({ message: "couldn't change username" });
  }
};

//get otp
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "kindly input an email" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "email doesn't exist" });
    }
    const otp = await OTPgenerator(user?.secretKey);
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "tinachristian2022@gmail.com",
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });

    const mailOption = {
      from: '"Avuwa Company" <tinachristian2022@gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: "Password Reset ", // Subject line
      text: `Your OTP code is ${otp}. It is valid for the next 30 seconds.`, // Plain text body
      html: `<p>Your OTP code is <b>${otp}</b>. It is valid for the next 30 seconds.</p>`, // HTML body
    };
    transporter.sendMail(mailOption, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
        return res.status(200).json({ message: "OTP sent successfully " });
      }
    });
  } catch (err) {
    return res.status(500).json({
      message: "an error occurred while trying to change OTP",
    });
  }
};
//login with otp

export const loginOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res
        .status(400)
        .json({ message: "please provide an email and otp" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({
      status: "success",
      message: "user logged in successfully",
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: "an error occured when trying to login with OTP ",
    });
  }
};

//update password

export const updatePasswordOtp = async (req, res) => {
  try {
    const { email } = req.params;
    const { newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        message: "please provide an email and a password",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    user.password = hashedPassword;
    user.save();

    res.status(200).json({
      status: "success",
      message: "password updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "an error occured while trying to update password with otp",
    });
  }
};
//all user access
export const getAllUsers = async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find({}, { password: 0 }); // Exclude the password field from the response
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error fetching users" });
  }
};
