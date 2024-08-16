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

const Register = async (req: Request, res: Response) => {
  // Validate request body with Zod
  const validationResult = registerSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({ errors: validationResult.error.errors });
  }

  const { email, password } = validationResult.data;

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return res.status(201).json({ message: 'User created' });
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





const Logout = (req: Request, res: Response) => {
  // To logout, typically we clear the token on the client-side.
  // On the server, you could implement token invalidation by blacklisting the token.

  res.status(200).json({ message: 'Logout successful' });
};

// Export Register function
export { Register, Login, Logout };