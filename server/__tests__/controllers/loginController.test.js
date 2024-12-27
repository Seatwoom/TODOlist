const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const request = require("supertest");
const loginController = require("../../controllers/loginController");

jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Login Controller", () => {
  let app;
  let userRepository;
  let mockUser;

  beforeEach(() => {
    jest.clearAllMocks();

    app = express();
    app.use(express.json());

    mockUser = {
      id: 1,
      username: "testuser",
      password: "hashedpassword123",
    };

    userRepository = {
      findOne: jest.fn(),
    };

    loginController(app, userRepository);
  });

  describe("POST /login", () => {
    it("should return 400 if username is missing", async () => {
      const response = await request(app)
        .post("/login")
        .send({ password: "testpass" });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Username and password are required");
    });

    it("should return 400 if password is missing", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "testuser" });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Username and password are required");
    });

    it("should return 404 if user does not exist", async () => {
      userRepository.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post("/login")
        .send({ username: "nonexistent", password: "testpass" });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("User does not exist");
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { username: "nonexistent" },
      });
    });

    it("should return 401 if password is incorrect", async () => {
      userRepository.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      const response = await request(app)
        .post("/login")
        .send({ username: "testuser", password: "wrongpass" });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Incorrect password");
      expect(bcrypt.compare).toHaveBeenCalledWith(
        "wrongpass",
        mockUser.password
      );
    });

    it("should return JWT token for valid credentials", async () => {
      userRepository.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("mock.jwt.token");

      const response = await request(app)
        .post("/login")
        .send({ username: "testuser", password: "correctpass" });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token", "mock.jwt.token");
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: mockUser.id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
    });

    it("should return 500 if database error occurs", async () => {
      userRepository.findOne.mockRejectedValue(
        new Error("DB connection failed")
      );

      const response = await request(app)
        .post("/login")
        .send({ username: "testuser", password: "testpass" });

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Database error");
    });
  });
});
