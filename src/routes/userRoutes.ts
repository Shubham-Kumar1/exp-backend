import { Router } from "express";
import { Register, Login, Logout } from "../controllers/user.controller";
import { auth } from "../middleware/auth"  // Import the auth middleware

const router = Router();

router.post("/register", Register);  // No authentication needed for registration
router.post("/login", Login);        // No authentication needed for login
router.post("/logout", auth, Logout); // Only authenticated users can log out

export default router;
