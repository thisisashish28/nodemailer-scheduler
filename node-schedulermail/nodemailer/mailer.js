const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS  // Use the generated App Password here
    }
});

const sendMail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: `"Ashish Kumar" <${process.env.EMAIL_USER}>`,
            to: to,
            subject: subject,
            text: text
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error in mailer scheduling', error);
    }
};

module.exports = sendMail;
