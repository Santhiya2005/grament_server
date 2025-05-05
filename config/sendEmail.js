import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Check if essential environment variables are present
const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        console.error(`Missing environment variable: ${envVar}`);
    }
});

// Create a transporter for Nodemailer using SMTP settings from .env
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,  // SMTP host, e.g., 'smtp.gmail.com'
    port: process.env.SMTP_PORT,  // Port number, typically 587 (TLS) or 465 (SSL)
    secure: process.env.SMTP_PORT == 465,  // SSL encryption if port is 465
    auth: {
        user: process.env.SMTP_USER,  // Your email address
        pass: process.env.SMTP_PASS,  // Your email password or app-specific password
    },
});

// Function to send an email
const sendEmail = async ({ sendTo, subject, html, text }) => {
    try {
        const mailOptions = {
            from: process.env.SMTP_USER,  // Sender email address (from .env)
            to: sendTo,                   // Recipient email address
            subject: subject,             // Email subject
            html: html,                   // HTML content for the email
            text: text || '',             // Optional plain text (for non-HTML email clients)
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully: ', info.response);
        return info;
    } catch (error) {
        console.error('Error sending email: ', error);
        throw new Error('Failed to send email');
    }
};

// Helper function to send OTP email
const sendOtpEmail = async (recipientEmail, otp) => {
    const subject = 'Your OTP for Password Reset';
    const html = `<p>Your OTP for password reset is <strong>${otp}</strong>.</p>`;
    const text = `Your OTP for password reset is ${otp}.`;

    return sendEmail({
        sendTo: recipientEmail,
        subject: subject,
        html: html,
        text: text,
    });
};

export { sendEmail, sendOtpEmail };
export default sendEmail; // Make sure you use default export here