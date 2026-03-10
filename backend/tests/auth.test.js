const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");

// Use an in-memory database or mocking for UserModel to avoid hitting Atlas in CI,
// but for this unit test locally, we can either mock the UserModel or just test the route rejection natively.

jest.mock("../model/UserModel", () => {
  const mockRegister = jest.fn();
  const mockAuthenticate = jest.fn(() => jest.fn());
  
  function MockUserModel(data) {
    Object.assign(this, data);
  }
  
  MockUserModel.register = mockRegister;
  MockUserModel.authenticate = mockAuthenticate;
  
  return { UserModel: MockUserModel };
});

const { UserModel } = require("../model/UserModel");

describe("Auth API Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /signup", () => {
    it("should return 200 and success message on successful registration", async () => {
      UserModel.register.mockResolvedValueOnce({ username: "testuser", email: "test@test.com" });

      const res = await request(app).post("/signup").send({
        email: "test@test.com",
        username: "testuser",
        password: "password123"
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Signup successful!");
      expect(res.body.user.username).toBe("testuser");
    });
    
    it("should return 400 when registration fails", async () => {
      UserModel.register.mockRejectedValueOnce(new Error("User already exists"));

      const res = await request(app).post("/signup").send({
        email: "test@test.com",
        username: "existinguser",
        password: "password123"
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("User already exists");
    });
  });

  describe("POST /login", () => {
    it("should return 200 on successful login", async () => {
      UserModel.authenticate.mockReturnValueOnce(
        jest.fn().mockResolvedValueOnce({ user: { username: "testuser", email: "test@test.com" } })
      );

      const res = await request(app).post("/login").send({
        username: "testuser",
        password: "password123"
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Login successful!");
    });

    it("should return 400 on invalid credentials", async () => {
      UserModel.authenticate.mockReturnValueOnce(
        jest.fn().mockResolvedValueOnce({ error: new Error("Invalid username or password") })
      );

      const res = await request(app).post("/login").send({
        username: "testuser",
        password: "wrongpassword"
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Invalid username or password");
    });
  });
});
