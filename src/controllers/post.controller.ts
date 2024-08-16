
import { prisma } from '../db/index';
import { Request, Response } from 'express';

const getPosts = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany();
  return res.status(200).json(posts);
};

const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return res.status(200).json(post);
};

const createPost = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const post = await prisma.post.create({
    data: {
      title,
      content,
    },
  });
  return res.status(201).json(post);
};

const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const post = await prisma.post.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title,
      content,
    },
  });
  return res.status(200).json(post);
};

const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.post.delete({
    where: {
      id: parseInt(id),
    },
  });
  return res.status(204).send();
};

export { getPosts, getPost, createPost, updatePost, deletePost };

