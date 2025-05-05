const forgotPasswordTemplate = ({ name, otp }) => {
    return `
    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <p>Dear ${name},</p>
        <p>You've requested a password reset. Please use the following OTP code to reset your password:</p>
        
        <div style="background-color: #f5f5f5; font-size: 20px; padding: 20px; text-align: center; font-weight: bold; color: #000;">
            ${otp}
        </div>
        
        <p>This OTP is valid for 1 hour only. Please enter this OTP on the <strong>Binkeyit</strong> website to proceed with resetting your password.</p>
        
        <p>Thank you,</p>
        <p><strong>thoovanam team</strong></p>
    </div>
    `;
}

export default forgotPasswordTemplate;
