// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../../models/users");
// const express = require("express");

// //register
// const registerUser = async (req, res) => {
//   const { userName, email, password } = req.body;

//   try {
//     const checkUser = await User.findOne({ email });
//     if (checkUser)
//       return res.json({
//         success: false,
//         message: "User Already exists with the same email! Please try again",
//       });

//     const hashPassword = await bcrypt.hash(password, 12);
//     const newUser = new User({
//       userName,
//       email,
//       password: hashPassword,
//     });

//     await newUser.save();
//     res.status(200).json({
//       success: true,
//       message: "Registration successful",
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occured",
//     });
//   }
// };

// //login
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const checkUser = await User.findOne({ email });
//     if (!checkUser)
//       return res.json({
//         success: false,
//         message: "User doesn't exists! Please register first",
//       });

//     const checkPasswordMatch = await bcrypt.compare(
//       password,
//       checkUser.password
//     );
//     if (!checkPasswordMatch)
//       return res.json({
//         success: false,
//         message: "Incorrect password! Please try again",
//       });

//     const token = jwt.sign(
//       {
//         id: checkUser._id,
//         role: checkUser.role,
//         email: checkUser.email,
//         userName: checkUser.userName,
//       },
//       "CLIENT_SECRET_KEY",
//       { expiresIn: "60m" }
//     );

//     res.cookie("token", token, { httpOnly: true, secure: false }).json({
//       success: true,
//       message: "Logged in successfully",
//       user: {
//         email: checkUser.email,
//         role: checkUser.role,
//         id: checkUser._id,
//         userName: checkUser.userName,
//       },
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occured",
//     });
//   }
// };

// //logout

// const logoutUser = (req, res) => {
//   res.clearCookie("token").json({
//     success: true,
//     message: "Logged out successfully!",
//   });
// };

// //auth middleware
// const authMiddleware = async (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token)
//     return res.status(401).json({
//       success: false,
//       message: "Unauthorised user!",
//     });

//   try {
//     const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       message: "Unauthorised user!",
//     });
//   }
// };

// module.exports = { registerUser, loginUser, logoutUser, authMiddleware };

// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const crypto = require("crypto");

// const User = require("../../models/users");
// const express = require("express");

// const {
//   generateTokenAndSetCookie,
// } = require("../../utils/generateTokenAndSetCookie");
// const {
//   sendPasswordResetEmail,
//   sendResetSuccessEmail,
//   sendVerificationEmail,
//   sendWelcomeEmail,
// } = require("../../mailtrap/emails");

// // Register
// const registerUser = async (req, res) => {
//   const { userName, email, password } = req.body;
//   try {
//     if (!userName || !email || !password) {
//       return res
//         .status(400)
//         .json({ success: false, message: "All fields are required" });
//     }

//     const checkUser = await User.findOne({ email });
//     if (checkUser)
//       return res.json({ success: false, message: "User already exists!" });

//     const hashPassword = await bcrypt.hash(password, 12);
//     const verificationToken = Math.floor(
//       100000 + Math.random() * 900000
//     ).toString();
//     const newUser = new User({
//       userName,
//       email,
//       password: hashPassword,
//       verificationToken,
//       verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
//     });

//     await newUser.save();
//     generateTokenAndSetCookie(res, newUser._id);
//     await sendVerificationEmail(newUser.email, verificationToken);

//     res.status(200).json({
//       success: true,
//       message: "Registration successful. Check your email for verification.",
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({ success: false, message: "An error occurred" });
//   }
// };

// // Verify Email
// const verifyEmail = async (req, res) => {
//   const { code } = req.body;
//   try {
//     const user = await User.findOne({
//       verificationToken: code,
//       verificationTokenExpiresAt: { $gt: Date.now() },
//     });
//     if (!user)
//       return res.status(400).json({
//         success: false,
//         message: "Invalid or expired verification code",
//       });

//     user.isVerified = true;
//     user.verificationToken = undefined;
//     user.verificationTokenExpiresAt = undefined;
//     await user.save();

//     await sendWelcomeEmail(user.email, user.userName);
//     res
//       .status(200)
//       .json({ success: true, message: "Email verified successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // Login
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.json({ success: false, message: "User doesn't exist!" });

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid)
//       return res.json({ success: false, message: "Incorrect password!" });

//     generateTokenAndSetCookie(res, user._id);
//     user.lastLogin = new Date();
//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "Logged in successfully",
//       user: {
//         email: user.email,
//         role: user.role,
//         id: user._id,
//         userName: user.userName,
//       },
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({ success: false, message: "An error occurred" });
//   }
// };

// // Logout
// const logoutUser = (req, res) => {
//   res
//     .clearCookie("token")
//     .json({ success: true, message: "Logged out successfully!" });
// };

// // Forgot Password
// const forgotPassword = async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user)
//       return res
//         .status(400)
//         .json({ success: false, message: "User not found" });

//     const resetToken = crypto.randomBytes(20).toString("hex");
//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpiresAt = Date.now() + 3600000; // 1 hour
//     await user.save();

//     await sendPasswordResetEmail(
//       user.email,
//       `${process.env.CLIENT_URL}/reset-password/${resetToken}`
//     );
//     res.status(200).json({
//       success: true,
//       message: "Password reset link sent to your email",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "An error occurred" });
//   }
// };

// // Reset Password
// const resetPassword = async (req, res) => {
//   const { token } = req.params;
//   const { password } = req.body;
//   try {
//     const user = await User.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpiresAt: { $gt: Date.now() },
//     });
//     if (!user)
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid or expired reset token" });

//     user.password = await bcrypt.hash(password, 12);
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpiresAt = undefined;
//     await user.save();

//     await sendResetSuccessEmail(user.email);
//     res
//       .status(200)
//       .json({ success: true, message: "Password reset successful" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "An error occurred" });
//   }
// };

// // Authentication Middleware

// const authMiddleware = async (req, res, next) => {
//   console.log("Cookies received:", req.cookies); // Log the cookies

//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: "Unauthorized user! No token provided.",
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded Token:", decoded); // Log the decoded token
//     // Use environment variable
//     req.user = decoded;
//     next();
//   } catch (error) {
//     if (error.name === "TokenExpiredError") {
//       return res.status(401).json({
//         success: false,
//         message: "Session expired. Please log in again.",
//       });
//     }
//     return res.status(401).json({
//       success: false,
//       message: "Invalid token. Authorization failed.",
//     });
//   }
// };

// // Check Auth
// const checkAuth = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     if (!user)
//       return res
//         .status(400)
//         .json({ success: false, message: "User not found" });
//     res.status(200).json({ success: true, user });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "An error occurred" });
//   }
// };

// // const checkAuth = async (req, res) => {
// //   try {
// //     const user = await User.findById(req.userId).select("-password");
// //     if (!user)
// //       return res
// //         .status(400)
// //         .json({ success: false, message: "User not found" });
// //     res.status(200).json({ success: true, user });
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({ success: false, message: "An error occurred" });
// //   }
// // };

// module.exports = {
//   registerUser,
//   verifyEmail,
//   loginUser,
//   logoutUser,
//   forgotPassword,
//   resetPassword,
//   authMiddleware,
//   checkAuth,
// };

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../../models/users");
const express = require("express");

const {
  generateTokenAndSetCookie,
} = require("../../utils/generateTokenAndSetCookie");

const {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} = require("../../mailtrap/emails");

// Register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    if (!userName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.status(400).json({ success: false, message: "User already exists!" });

    const hashPassword = await bcrypt.hash(password, 12);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await newUser.save();
    generateTokenAndSetCookie(res, newUser._id);
    await sendVerificationEmail(newUser.email, verificationToken);

    const user = newUser.toObject(); 
    user.id = user._id; 
    delete user._id; 
    
    res.status(200).json({
      success: true,
      message: "Registration successful. Check your email for verification.",
      user,
    });
    
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};

// Verify Email
const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user)
      return res
        .status(400)
        .json({
          success: false,
          message: "Invalid or expired verification code",
        });

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.userName);
    res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.statuss(400).json({ success: false, message: "User doesn't exist!" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ success: false, message: "Incorrect password!" });

    generateTokenAndSetCookie(res, user._id);
    user.lastLogin = new Date();
    await user.save();

    const userData = user.toObject();
    userData.id = userData._id;
    delete userData._id;
    
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: userData,
    });
    
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};

// Logout
const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
  }).json({ success: true, message: "Logged out successfully!" });
  
};

// Forgot Password
const forgotPassword = async (req, res) => {
  console.log("Request received:", req.body); // Log entire body to debug

  const { email } = req.body;

  if (!email) {
    console.log("Email is missing in request body");
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  console.log("Request received to reset password for email:", email);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found with email:", email);
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    console.log("Generated reset token:", resetToken);

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = Date.now() + 3600000; // 1 hour
    await user.save();

    console.log("Reset token saved for user:", user.email);

    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/auth/reset-password/${resetToken}`
    );
    console.log("Password reset email sent to:", user.email);

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log("Error in forgotPassword function:", error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};



// Reset Password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });

    user.password = await bcrypt.hash(password, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);
    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};

// Authentication Middleware
const authMiddleware = (req, res, next) => {
  console.log("Cookies:", req.cookies); // Check if cookies are being received
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  console.log("Token:", token); // Check if token exists

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized! No token." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Ensure it contains userId
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("JWT Error:", error); // Log any JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Session expired. Please log in again." });
    }
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


// Check Auth
const checkAuth = async (req, res) => {
  console.log("User ID from middleware:", req.userId);
  try {
    const user = await User.findById(req.userId).select("-password");
if (!user) {
  return res.status(400).json({ success: false, message: "User not found" });
}

const userData = user.toObject();
userData.id = userData._id;
delete userData._id;

res.status(200).json({ success: true, user: userData });

  } catch (error) {
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};

// Count Verified Users
// const countVerifiedUsers = async (req, res) => {
//   try {
//     const verifiedUserCount = await User.countDocuments({ isVerified: true });
//     res.status(200).json({
//       success: true,
//       verifiedUserCount,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "An error occurred" });
//   }
// };


module.exports = {
  registerUser,
  verifyEmail,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  authMiddleware,
  checkAuth,
  // countVerifiedUsers,
};
