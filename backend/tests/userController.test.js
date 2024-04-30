const {
  getUserProfile,
  getUserProfileById,
  getAllProfiles,
  updateUserProfile,
  updateUserProfileById,
  deleteUserById,
  updateUserRoleById,
} = require("../controllers/userController");
const User = require("../models/userModel");

jest.mock("../models/userModel");

describe("User Controller", () => {
  describe("getUserProfile", () => {
    it("should return user profile", async () => {
      const req = { user: { _id: "user_id" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const user = {
        _id: "user_id",
        name: "Test User",
        email: "test@example.com",
        mobile: "1234567890",
        role: "user",
      };
      User.findById.mockResolvedValue(user);

      await getUserProfile(req, res, jest.fn());

      expect(User.findById).toHaveBeenCalledWith("user_id");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(user);
    });

    it("should handle errors", async () => {
      const req = { user: { _id: "user_id" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findById.mockRejectedValue(new Error("Database error"));

      const next = jest.fn();

      await getUserProfile(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error("Database error"));
    });
  });

  describe("getUserProfileById", () => {
    it("should return user profile by ID", async () => {
      const req = { params: { id: "user_id" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const user = {
        _id: "user_id",
        name: "Test User",
        email: "test@example.com",
        mobile: "1234567890",
        role: "user",
      };
      User.findById.mockResolvedValue(user);

      await getUserProfileById(req, res, jest.fn());

      expect(User.findById).toHaveBeenCalledWith("user_id");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(user);
    });

    it("should handle errors", async () => {
      const req = { params: { id: "user_id" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findById.mockRejectedValue(new Error("Database error"));

      const next = jest.fn();

      await getUserProfileById(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error("Database error"));
    });
  });

  describe("getAllProfiles", () => {
    it("should return all user profiles", async () => {
      const req = {};
      const res = {
        json: jest.fn(),
      };
      const users = [
        {
          _id: "user_id_1",
          name: "Test User 1",
          email: "test1@example.com",
          mobile: "1234567890",
          role: "user",
        },
        {
          _id: "user_id_2",
          name: "Test User 2",
          email: "test2@example.com",
          mobile: "9876543210",
          role: "admin",
        },
      ];
      User.find.mockResolvedValue(users);

      await getAllProfiles(req, res, jest.fn());

      expect(User.find).toHaveBeenCalledWith({});
      expect(res.json).toHaveBeenCalledWith(users);
    });

    it("should handle errors", async () => {
      const req = {};
      const res = {
        json: jest.fn(),
      };
      User.find.mockRejectedValue(new Error("Database error"));

      const next = jest.fn();

      await getAllProfiles(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error("Database error"));
    });
  });

  describe("updateUserProfile", () => {
    it("should handle errors", async () => {
      const req = {
        user: { _id: "user_id" },
        body: { name: "New Name", email: "newemail@example.com" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findById.mockRejectedValue(new Error("Database error"));

      const next = jest.fn();

      await updateUserProfile(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error("Database error"));
    });
  });

  describe("updateUserProfileById", () => {
    it("should handle errors", async () => {
      const req = {
        params: { id: "user_id" },
        body: { name: "New Name", email: "newemail@example.com" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findById.mockRejectedValue(new Error("Database error"));

      const next = jest.fn();

      await updateUserProfileById(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error("Database error"));
    });
  });

  describe("deleteUserById", () => {
    it("should delete user by ID", async () => {
      const req = { params: { id: "user_id" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findById.mockResolvedValue({ _id: "user_id" });

      await deleteUserById(req, res, jest.fn());

      expect(User.findById).toHaveBeenCalledWith("user_id");
      expect(User.deleteOne).toHaveBeenCalledWith({ _id: "user_id" });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "User deleted successfully",
      });
    });

    it("should handle errors", async () => {
      const req = { params: { id: "user_id" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findById.mockRejectedValue(new Error("Database error"));

      const next = jest.fn();

      await deleteUserById(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error("Database error"));
    });
  });

  describe("updateUserRoleById", () => {
    it("should update user role by ID", async () => {
      const req = {
        params: { id: "user_id" },
        body: { role: "admin" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const updatedUser = {
        _id: "user_id",
        name: "Test User",
        email: "test@example.com",
        mobile: "1234567890",
        role: "admin",
      };
      const saveMock = jest.fn().mockResolvedValue(updatedUser);
      const user = { ...updatedUser, save: saveMock };
      User.findById.mockResolvedValue(user);

      await updateUserRoleById(req, res, jest.fn());

      expect(User.findById).toHaveBeenCalledWith("user_id");
      expect(saveMock).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedUser);
    });

    it("should handle errors", async () => {
      const req = {
        params: { id: "user_id" },
        body: { role: "admin" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findById.mockRejectedValue(new Error("Database error"));

      const next = jest.fn();

      await updateUserRoleById(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error("Database error"));
    });
  });
});
