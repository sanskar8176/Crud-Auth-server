import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  static userRegistration = async (req, res) => {
    const { name, email, password } = req.body;
    if (name && email && password) {
      const user = await UserModel.findOne({ email: email });
      if (user) {
        res.json({ status: "failed", message: "Email already exists" });
      } else {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          const doc = new UserModel({
            name: name,
            email: email,
            password: hashPassword,
          });
          await doc.save();
          const saved_user = await UserModel.findOne({ email: email });
          // Generate JWT Token
          const token = jwt.sign(
            { userID: saved_user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );
          res.status(201).json({
            status: "success",
            message: "Registration Success",
            token: token,
          });
        } catch (error) {
          console.log(error);
          res.json({ status: "failed", message: "Unable to Register" });
        }
      }
    } else {
      res.json({ status: "failed", message: "All fields are required" });
    }
  };

  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email });
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (user.email === email && isMatch) {
            // Generate JWT Token
            const token = jwt.sign(
              { userID: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "5d" }
            );
            res.json({
              status: "success",
              message: "Login Success",
              token: token,
            });
          } else {
            res.json({
              status: "failed",
              message: "Email or Password is not Valid",
            });
          }
        } else {
          res.json({
            status: "failed",
            message: "You are not a Registered User",
          });
        }
      } else {
        res.json({ status: "failed", message: "All Fields are Required" });
      }
    } catch (error) {
      console.log(error);
      res.json({ status: "failed", message: "Unable to Login" });
    }
  };
}

export default UserController;
