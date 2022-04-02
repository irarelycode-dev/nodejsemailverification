import { sendMail } from "../mailer.js";
import { generateOtp } from "../otp-generator.js";
import { User } from "../user.model.js";

export const authDefault = (req, res) => {
  res.status(200).send("success");
};

export const signUpuser = async (req, res) => {
  const { email, password } = req.body;
  const isExisting = await findUserByEmail(email);
  if (isExisting) {
    return res.send("Already existing");
  }
  const newUser = await createUser(email, password);
  if (!newUser[0]) {
    return res.status(400).send({
      message: "Unable to create new user",
    });
  }
  res.send(newUser);
};

export const verifyUser = async (req, res) => {
  const { email, otp } = req.body;
  const user = await validateUserSignUp(email, otp);
  res.send(user);
};

const validateUserSignUp = async (email, otp) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return [false, "User not found"];
  }
  if (user && user.otp !== otp) {
    return [false, "Invalid OTP"];
  }
  const updatedUser = await User.findByIdAndUpdate(user._id, {
    $set: { active: true },
  });
  return [true, updatedUser];
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return false;
  }
  return user;
};

const createUser = async (email,password) => {
  const otpGenerated = generateOtp();
  const newUser = await User.create({
    email,
    password,
    otp: otpGenerated,
  });
  if (!newUser) {
    return [false, "Unable to sign you up"];
  }

  try {
    await sendMail({
      to: email,
      OTP: otpGenerated,
    });
    return [true,newUser]
  } catch (error) {
    return [false, 'Unable to sign up, Please try again later', error];
  }
};
