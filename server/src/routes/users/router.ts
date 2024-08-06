import { Router } from "express";
import * as routes from "./routes";
import { protect } from "../../middleware";

const router = Router();

// TODO: Need to protect

// Auth
router.post("/login", routes.login); // Login - working
router.post("/register", routes.register); // Register - woring
// router.post("/forgot"); // Forgot Password - not started
// router.post("/reset"); // Reset Password - not started
router.post("/logout", routes.logout); // Logout

// CRUD
router.get("/", protect(routes.getAllUsers)); // Get Users - working, need to protect/limit based on access
router.get("/me", protect(routes.getMe)); // Get self - working, need to protect/limit based on access
router.get("/:id", routes.getUserById); // Get User by Id - working, need to protect/limit based on access
router.put("/", routes.updateProfile); // Update self
router.put("/:id", routes.updateUserAdmin); // Update User by Id - SUPERUSER, fallback to self, or 403
router.delete("/", routes.deleteSelf); // Delete self
router.delete("/:id", routes.deleteUser); // Delete User by Id - woring, SUPERUSER ONLY, fallback to self, or 403

module.exports = router;
