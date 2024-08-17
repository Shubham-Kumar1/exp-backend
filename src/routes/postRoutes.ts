import { Router } from "express";
import { getPosts, getPost, createPost, updatePost, deletePost } from "../controllers/post.controller";
import { auth } from "../middleware/auth";

const router = Router();

router.get("/", auth, getPosts);
router.get("/:id", auth, getPost);
router.post("/", auth, createPost);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

export default router;
