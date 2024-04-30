const {
  authUser,
  registerUser,
  logoutUser,
} = require("../controllers/authController");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

jest.mock("../models/userModel");
jest.mock("../utils/generateToken");

describe("Auth Middleware", () => {
  describe("authUser", () => {
    it("should return error for invalid email or password", async () => {
      const req = {
        body: {
          email: "test@example.com",
          password: "password123",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findOne.mockResolvedValue(null);

      await authUser(req, res, jest.fn());

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: "Invalid email or password",
      });
    });

    it("should handle errors", async () => {
      const req = {
        body: {
          email: "test@example.com",
          password: "password123",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findOne.mockRejectedValue(new Error("Database error"));

      const next = jest.fn();

      await authUser(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error("Database error"));
    });
  });

  describe("registerUser", () => {
    it("should create a new user successfully", async () => {
      const req = {
        body: {
          name: "Test User",
          email: "test@example.com",
          mobile: "1234567890",
          password: "password123",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findOne.mockResolvedValue(null);
      const user = {
        _id: "user_id",
        name: "Test User",
        email: "test@example.com",
        mobile: "1234567890",
        role: "user",
      };
      User.create.mockResolvedValue(user);
      const token = "generated_token";
      generateToken.mockReturnValue(token);

      await registerUser(req, res, jest.fn());

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(User.create).toHaveBeenCalledWith({
        name: "Test User",
        email: "test@example.com",
        mobile: "1234567890",
        password: "password123",
      });
      expect(generateToken).toHaveBeenCalledWith(res, "user_id");
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Registration successful",
        user: {
          _id: "user_id",
          name: "Test User",
          email: "test@example.com",
          mobile: "1234567890",
          role: "user",
        },
        token: "generated_token",
      });
    });

    it("should return error if user already exists", async () => {
      const req = {
        body: {
          name: "Test User",
          email: "test@example.com",
          mobile: "1234567890",
          password: "password123",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findOne.mockResolvedValue(true);

      await registerUser(req, res, jest.fn());

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "User already exists" });
    });

    it("should handle errors", async () => {
      const req = {
        body: {
          name: "Test User",
          email: "test@example.com",
          mobile: "1234567890",
          password: "password123",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findOne.mockRejectedValue(new Error("Database error"));

      const next = jest.fn();

      await registerUser(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error("Database error"));
    });
  });

  describe("logoutUser", () => {
    it("should clear JWT cookie and return success message", () => {
      const req = {};
      const res = {
        clearCookie: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      logoutUser(req, res);

      expect(res.clearCookie).toHaveBeenCalledWith("jwt");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "logout successfully" });
    });
  });
});
