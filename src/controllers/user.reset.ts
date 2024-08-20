import { prisma } from '../db/index';
import { Request, Response } from 'express';
import { resetPasswordSchema } from '../validators/userSchema';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';

// dotenv
import dotenv from 'dotenv';
dotenv.config({
  path: './.env',
});

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail', // or any other email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const ResetPassword = async (req: Request, res: Response) => {
  // Validate request body with Zod
  const validationResult = resetPasswordSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({ errors: validationResult.error.errors });
  }

  const { email } = validationResult.data;

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Generate OTP and expiration time (5 minutes)
  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpExpiration = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

  // Save OTP and expiration time in the database
  await prisma.user.update({
    where: { email },
    data: {
      otp,
      otpExpirationTime: otpExpiration,
    },
  });

  // Send OTP via email using Nodemailer
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Password Reset OTP',
    text: `Your OTP for password reset is ${otp}. It is valid for 5 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to send OTP' });
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).json({ message: 'OTP sent successfully' });
    }
  });
};

const VerifyOTPAndResetPassword = async (req: Request, res: Response) => {
  const { email, otp, newPassword } = req.body;

  // Find the user by email and check OTP
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Check if the OTP is correct and within the 5-minute window
  if (user.otp !== otp || !user.otpExpirationTime || new Date() > user.otpExpirationTime) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  // Hash the new password and update it in the database
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { email },
    data: {
      password: hashedPassword,
      otp: null, // Clear OTP after use
      otpExpirationTime: null, // Clear OTP expiration
    },
  });

  return res.status(200).json({ message: 'Password reset successfully' });
};

export { ResetPassword, VerifyOTPAndResetPassword };
