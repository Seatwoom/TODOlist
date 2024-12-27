const request = require("supertest");
const { getApp, getConnection } = require("./setup");
require("dotenv").config({ path: "test.env" });

describe("Auth Integration", () => {
  let app;
  let connection;

  beforeAll(async () => {
    app = await getApp();
    connection = await getConnection();
  });

  it("should register and login user", async () => {
    const registerResponse = await request(app).post("/register").send({
      username: "testuser",
      password: "testpass123",
    });

    expect(registerResponse.status).toBe(201);
    expect(registerResponse.body.message).toBe("User registered successfully");

    const loginResponse = await request(app).post("/login").send({
      username: "testuser",
      password: "testpass123",
    });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty("token");

    const token = loginResponse.body.token;
    const tasksResponse = await request(app)
      .get("/tasks")
      .set("Authorization", token);

    expect(tasksResponse.status).toBe(200);
    expect(Array.isArray(tasksResponse.body)).toBe(true);
  });

  it("should not allow duplicate usernames", async () => {
    await request(app).post("/register").send({
      username: "testuser2",
      password: "testpass123",
    });

    const response = await request(app).post("/register").send({
      username: "testuser2",
      password: "different_password",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Username already taken");
  });
});
