import { prisma } from '../db/index';
import { Request, Response } from 'express';
import { registerSchema, loginSchema } from '../validators/userSchema';
import bcrypt from 'bcrypt';

// create jwt token  for login
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({
  path: './.env',
});

// create Register function inside try catch block with validation
const Register = async (req: Request, res: Response) => {
  // Validate request body with Zod
  const validationResult = registerSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({ errors: validationResult.error.errors });
  }

  const { email, password } = validationResult.data;

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  // Create token without password
  const token = jwt.sign({ email: newUser.email, id: newUser.id }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });

  return res.status(201).json({ token });
};

const RegisterViaGoogle = async (req: Request, res: Response) => {
  // Implement Google OAuth2.0 registration here
}

const Login = async (req: Request, res: Response) => {
  // Validate request body with Zod
  const validationResult = loginSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({ errors: validationResult.error.errors });
  }

  const { email, password } = validationResult.data;

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Check if password is correct
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Create token without password
  const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });

  return res.status(200).json({ token });
};

const Logout = async (req: Request, res: Response) => {
  try {
    // Clear the token from cookies (if using cookies for token storage)
    res.clearCookie('token');  // Adjust the cookie name if needed

    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error logging out:', error);
    return res.status(500).json({ error: 'Failed to log out' });
  }
};


// Export Register function
export { Register, Login, Logout, RegisterViaGoogle };