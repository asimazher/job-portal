const {User, validateUser, validateUserLogin} = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const emailService = require("../utils/emailService");
const { signupSchema,loginSchema } = require("../utils/vaildation");
const {accountCreationTemplate, forgotPasswordTemplate, changePasswordTemplate, pendingStatusTemplate, rejectedStatusTemplate, selectedStatusTemplate} = require("../utils/emailTemplate");
// const activationEmailTemplate = emailTemplate


exports.createUser = async (req, res) => {
  try {

  // validate data before registering user

  const { error } = validateUser(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { firstName, lastName, email } = req.body;

  const isRegistered = await User.findOne({ where: {email: email}})

  if(isRegistered){
      return res.status(400).json({message: "User Already Exists."})
  }

  // const hashedPassword = await bcrypt.hash(password, 10);

  // Generate a verification token
  const rememberToken = jwt.sign(
    { email: email },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );

  await User.create({
    firstName,
    lastName,
    email,
    rememberToken
  });

  // ??? Add the link/route of setPassword page ???

  const verificationLink = `http://localhost:3000/api/auth/verify/${rememberToken}`;

  const emailOptions = {
    to: email,
    subject: "Account Verification",
    text: `Click the following link to verify your account: ${verificationLink}`,
    html: accountCreationTemplate.replace('/{{username}}/g', firstName).replace('/{{activationLink}}/g', verificationLink),
  };
  // Send verification email using nodemailer

  emailService(emailOptions);

  res.status(201).json({
    message: "User created.",
    rememberToken,
  });
} catch (error) {
  res.status(500).json({ message: "Internal Server Error", error });
}
};

exports.setPassword = async (req, res) => {
  try {
    // validate data before signup
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({error: "password doesn't match."});
    }

    const { token } = req.params;

    const user = await User.findOne({ where: {rememberToken: token}})

    if(!user){
      return res.status(400).json({error: "auth-error: user does not exist."});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    User.findOne({ where: {rememberToken: token}})
  .then((user) => {
    if (user) {
      // Update the attributes
      user.password = hashedPassword;
      user.isVerified = true;
      user.rememberToken = null;

      // Save the changes to the database
      return user.save();
    } else {
      console.log('user not found');
    }
  })
  .then((updatedUser) => {
    if (updatedUser) {
      console.log('Entry updated successfully:', updatedUser.toJSON());
    }
  })

  // ????    password has been set - email also tell if it was not you click on thelink and reverse this action and set
 //  ????    a new password
    ////////

    res
      .status(201)
      .json({
        message: "Password created. Now you can login.",
        // user,
      });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// exports.verifyUser = async (req, res) => {
//   try {
//     const { token } = req.params;

//     const decoded = jwt.verify(token, process.env.VERIFY_SECRET_KEY);

//     const user = await User.findOne({ username: decoded.username });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Update the user's isVerified field to true
//     user.isVerified = true;
//     await user.save();

//     res.json({
//       message: "Account verified successfully. You can now log in.",
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error", error });
//   }
// };

exports.loginUser = async (req, res) => {
  try {
    // validate data before login
    const { error } = validateUserLogin(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ where: {email: email}})
    // const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    if (!user.isVerified) {
      return res
        .status(401)
        .json({
          error:
            "Account password has not been set. Check your email for password setting instructions."
        });
    }

    const accessToken = jwt.sign(
      {
        email: user.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "3h" }
    );
    // const { password, ...other } = user._doc;
    // res.status(200).json({ ...other, accessToken });
    res.status(200).json({ accessToken });

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", error });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: {email: email}});

    if (!user) {
      return res.status(404).json({ error: "Invalid email" });
    }

    const resetToken = jwt.sign(
      {
        email: user.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "15m" }
    );

    // -add-at-frontend-resetpassword-component-route
    // api for button at front end form `http://localhost:3000/api/users/forgetpassword/${resetToken}`

    const resetLink = `http://localhost:3000/api/users/reset-password/${resetToken}`;

    const emailOptions = {
      to: email,
      subject: "Password Reset",
      text: `Click the following link to reset your password: ${resetLink}`,
      html: forgotPasswordTemplate
    };

    // Send password reset email with reset link using nodemailer
    emailService(emailOptions);

    res.json({ message: "Password reset link email sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", error });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    // const { token } = req.params;
    const token = req.headers.authorization;

    // console.log(token)
    // console.log(tokenhead)
    const { newPassword, confirmPassword } = req.body;
    // console.log(confirmPassword)

    // if (token && token.startsWith('Bearer')) {
      const tokenValue = token.split(' ')[1];
    // }
    //   try {
    //     const decodeToken = await util.promisify(jwt.verify)(
    //       tokenValue,
    //       process.env.SECERET_STRING
    //     );
    
    const decoded = jwt.verify(tokenValue, process.env.SECRET_KEY);
    
    const user = await User.findOne({ where: {email: decoded.email}})
    // const user = await User.findById({ _id: decoded.id });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    if (newPassword !== confirmPassword) {
      return res.status(400).json({error: "password doesn't match."});
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the attributes
    user.password = hashedPassword;
    user.isVerified = true;
    user.rememberToken = null;

    await user.save();

    res.json({ message: "new password set successfully, Now you can login." });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", error });
  }
};

exports.changePassword = async (req, res) => {
  try {
    // const { token } = req.params;
    const token = req.headers.authorization;

    // console.log(token)
    // console.log(tokenhead)
    const { oldPassword, newPassword, confirmPassword } = req.body;
    // console.log(confirmPassword)

    // if (token && token.startsWith('Bearer')) {
      const tokenArr = token.split(' ');

      // console.log(req.headers)

      const tokenValue = tokenArr[1]
    // }
    //   try {
    //     const decodeToken = await util.promisify(jwt.verify)(
    //       tokenValue,
    //       process.env.SECERET_STRING
    //     );
    
    const decoded = jwt.verify(tokenValue, process.env.SECRET_KEY);
    
    const user = await User.findOne({ where: {email: decoded.email}})
    // const user = await User.findById({ _id: decoded.id });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    if (newPassword !== confirmPassword) {
      return res.status(400).json({error: "password doesn't match."});
    }

    const isPasswordValid = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "password is incorrect. please enter correct password." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the attributes
    user.password = hashedPassword;
    user.isVerified = true;
    user.rememberToken = null;

    await user.save();

    // console.log(res.body)
    res.json({ message: "password changed successfully."});

  // res.json({ message: "password changed successfully.",
  // reqId : req.reqId });

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", error });
  }
};


const sendResponse = (res, statusCode, data, success) => {
  return res.status(statusCode).json({ success, data });
};