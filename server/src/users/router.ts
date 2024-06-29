import { Router } from "express";
import { login, register, deleteUser, getAllUsers, getUserById } from "./routes";

const router = Router();

// TODO: Need to protect

// Login - working
router.post("/login", login);
// Register - working
router.post("/register", register);

// Forgot Password
// router.post("/forgot");
// Reset Password
// router.post("/reset");

// Get Users - working, need to protect/limit based on access
router.get("/", getAllUsers);
// Get User by Id - working, need to protect
router.get("/:id", getUserById);
// Update User by Id - SUPERUSER, fallback to self, or 403
router.put("/:id");
// Delete User by Id - woring, SUPERUSER ONLY, fallback to self, or 403
router.delete("/:id", deleteUser);

module.exports = router;
