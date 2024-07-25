import * as OTPAuth from "otpauth";
import User from "../models/userModel.js";

export const validateOtp = async (req, res, next) => {
  try {

    const {otp}= req.body
    const {email} = req.params

    const user = await User.findOne({email})
    let {totp} = new OTPAuth.TOTP({
      // Provider or service the account is associated with.
      issuer: "Avuwa",
      // Account identifier.
      label: "AzureDiamond",
      // Algorithm used for the HMAC function.
      algorithm: "SHA1",
      // Length of the generated tokens.
      digits: 6,
      // Interval of time for which a token is valid, in seconds.
      period: 120,
      // Arbitrary key encoded in Base32 or OTPAuth.Secret instance.
      secret: user.secretKey, // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'
    });
    
    const delta = totp.validate({ token:otp, window: 1 });
    if (delta === null) {
      res.status(400).json("invalid OTP");
    } else {
       next();
    }
  } catch (err) {
    next(err)
  }
};
