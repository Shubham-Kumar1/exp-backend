
import { Router } from "express";

const router = Router();

router.get("/posts", (req, res) => {
    res.send("All posts");
    }
);

router.post("addPost", (req, res) => {
    res.send("Post added");
});


export default router;
