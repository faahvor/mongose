import * as OTPAuth from "otpauth";

export const validateOtp = async (req,res)=>{
    try{
        let totp = new OTPAuth.TOTP({
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
            secret: "NB2W45DFOIZA", // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'
          });
          const {otp}=req.body
          const delta =totp.validate({otp,window: 1})
          if(delta!== null){
            return next()
          }

    }catch(err){
        return res.status(500).json({
            status:"error",
            message:"an error when trying to verify token"
        })
    }
}