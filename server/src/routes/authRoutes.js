const express = require("express");
const { body } = require("express-validator");
const {
  register,
  login,
  getCurrentUser,
  updateProfile,
  logout
} = require("../controllers/authController");
const { authenticateToken } = require("../middlewares/auth");

const router = express.Router();

// Validation rules
const registerValidation = [
  body("username")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username phải có từ 3-30 ký tự")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username chỉ được chứa chữ cái, số và dấu gạch dưới"),
  
  body("email")
    .isEmail()
    .withMessage("Email không hợp lệ")
    .normalizeEmail(),
  
  body("password")
    .isLength({ min: 6 })
    .withMessage("Mật khẩu phải có ít nhất 6 ký tự")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa và 1 số"),
  
  body("fullName")
    .optional()
    .isLength({ max: 50 })
    .withMessage("Tên không được quá 50 ký tự")
    .trim()
];

const loginValidation = [
  body("username")
    .notEmpty()
    .withMessage("Username hoặc email là bắt buộc"),
  
  body("password")
    .notEmpty()
    .withMessage("Mật khẩu là bắt buộc")
];

const updateProfileValidation = [
  body("fullName")
    .optional()
    .isLength({ max: 50 })
    .withMessage("Tên không được quá 50 ký tự")
    .trim(),
  
  body("email")
    .optional()
    .isEmail()
    .withMessage("Email không hợp lệ")
    .normalizeEmail()
];

// Public routes
router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

// Protected routes
router.get("/me", authenticateToken, getCurrentUser);
router.put("/profile", authenticateToken, updateProfileValidation, updateProfile);
router.post("/logout", authenticateToken, logout);

module.exports = router;
