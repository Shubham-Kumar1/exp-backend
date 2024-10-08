import { Router } from "express";
import { Register, RegisterViaGoogle, Login, Logout } from "../controllers/user.controller";
import { ResetPassword, VerifyOTPAndResetPassword } from "../controllers/user.reset";
import { auth } from "../middleware/auth"  // Import the auth middleware

const router = Router();

router.post("/register", Register);  // No authentication needed for registration
router.post("registerViaGoogle", RegisterViaGoogle); // No authentication needed for registration
router.post("/login", Login);        // No authentication needed for login
router.post("/logout", auth, Logout); // Only authenticated users can log out

// reset and forgot password routes
router.post("/reset-password", ResetPassword);
router.post("/verify-otp-and-reset-password", VerifyOTPAndResetPassword);
export default router;
