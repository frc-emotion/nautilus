import { Router } from "express";
import * as routes from "./routes";

const router = Router();

// TODO: Need to protect

// Login - working
router.post("/login", routes.login);
// Register - working
router.post("/register", routes.register);

// Forgot Password
// router.post("/forgot");
// Reset Password
// router.post("/reset");

// Get Users - working, need to protect/limit based on access
router.get("/", routes.getAllUsers);
// Get User by Id - working, need to protect/limit based on access
router.get("/:id", routes.getUserById);
// Update self
router.put("/", routes.updateProfile);
// Update User by Id - SUPERUSER, fallback to self, or 403
router.put("/:id", routes.updateUserAdmin);
// Delete self
router.delete("/", routes.deleteSelf);
// Delete User by Id - woring, SUPERUSER ONLY, fallback to self, or 403
router.delete("/:id", routes.deleteUser);

module.exports = router;
