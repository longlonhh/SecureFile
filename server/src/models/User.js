const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username là bắt buộc"],
    unique: true,
    trim: true,
    minlength: [3, "Username phải có ít nhất 3 ký tự"],
    maxlength: [30, "Username không được quá 30 ký tự"]
  },
  email: {
    type: String,
    required: [true, "Email là bắt buộc"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Email không hợp lệ"]
  },
  password: {
    type: String,
    required: [true, "Password là bắt buộc"],
    minlength: [6, "Password phải có ít nhất 6 ký tự"]
  },
  fullName: {
    type: String,
    trim: true,
    maxlength: [50, "Tên không được quá 50 ký tự"]
  },
  avatar: {
    type: String,
    default: null
  },
  role: {
    type: String,
    enum: ["user", "admin", "premium"],
    default: "user"
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: null
  },
  loginCount: {
    type: Number,
    default: 0
  },
  storageUsed: {
    type: Number,
    default: 0
  },
  maxStorage: {
    type: Number,
    default: 128 * 1024 * 1024 * 1024 // 128GB
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual cho storage percentage
userSchema.virtual('storagePercentage').get(function() {
  return ((this.storageUsed / this.maxStorage) * 100).toFixed(2);
});

// Hash password trước khi lưu
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method để so sánh password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method để cập nhật last login
userSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date();
  this.loginCount += 1;
  return this.save();
};

// Method để lấy thông tin public (không có password)
userSchema.methods.getPublicProfile = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

// Index cho performance (chỉ tạo index cho createdAt vì username và email đã có unique)
userSchema.index({ createdAt: -1 });

module.exports = mongoose.model("User", userSchema);
