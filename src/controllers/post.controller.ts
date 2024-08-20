import { prisma } from '../db/index';
import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth'; // Assuming you have the auth interface

// Get all posts
const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                author: {
                    select: { id: true, email: true, name: true },
                },
                comments: true,
            },
        });
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};

// Get a single post
const getPost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                author: {
                    select: { id: true, email: true, name: true },
                },
                comments: true,
            },
        });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Failed to fetch post' });
    }
};

// Create a new post
const createPost = async (req: AuthRequest, res: Response) => {
    try {
        const { title, content } = req.body;

        if (!req.user) {
            return res.status(401).json({ error: 'Please authenticate' });
        }

        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                author: { connect: { id: req.user.id } }, // Associate the post with the logged-in user
            },
        });

        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Failed to create post' });
    }
};

// Update an existing post
const updatePost = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        if (!req.user) {
            return res.status(401).json({ error: 'Please authenticate' });
        }

        const post = await prisma.post.findUnique({
            where: { id },
        });

        if (!post || post.authorId !== req.user.id) {
            return res.status(404).json({ error: 'Post not found or not authorized to edit' });
        }

        const updatedPost = await prisma.post.update({
            where: { id },
            data: { title, content },
        });

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Failed to update post' });
    }
};

// Delete a post
const deletePost = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        if (!req.user) {
            return res.status(401).json({ error: 'Please authenticate' });
        }

        const post = await prisma.post.findUnique({
            where: { id },
        });

        if (!post || post.authorId !== req.user.id) {
            return res.status(404).json({ error: 'Post not found or not authorized to delete' });
        }

        await prisma.post.delete({
            where: { id },
        });

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Failed to delete post' });
    }
};

export { getPosts, getPost, createPost, updatePost, deletePost };
