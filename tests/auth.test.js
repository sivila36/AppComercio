const request = require("supertest");
const app = require("../app"); // Importa la app principal
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../models/User");
const bcrypt = require("bcrypt");

let mongoServer;

beforeAll(async () => {
  // Configura MongoDB en memoria para las pruebas
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

afterAll(async () => {
  // Cierra la conexión con la base de datos de pruebas
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("POST /auth/register", () => {
  it("debería registrar un nuevo usuario", async () => {
    const passwordHash = await bcrypt.hash("password", 10);
    const newUser = {
      name: "Test User",
      email: "test@example1.com",
      password: passwordHash,
      role: "client",
    };

    const response = await request(app).post("/auth/register").send(newUser);

    expect(response.status).toBe(302);
    const userInDB = await User.findOne({ email: newUser.email });
    expect(userInDB).not.toBeNull();
    expect(userInDB.name).toBe(newUser.name);
  });

  it("debería fallar al intentar registrar un usuario con un email ya existente", async () => {
    const existingUser = {
      name: "Existing User",
      email: "existing@example.com",
      password: "password123",
    };

    // Crear el usuario inicial
    await User.create(existingUser);

    // Intentar registrar un usuario con el mismo email
    const response = await request(app)
      .post("/auth/register")
      .send(existingUser);

    expect(response.status).toBe(400);
    expect(response.body.error).toContain("El correo ya está registrado");
  });
});

describe("POST /auth/login", () => {
  beforeAll(async () => {
    // Crear usuarios para las pruebas
    const passwordHash = await bcrypt.hash("password", 10);
    await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: passwordHash,
      role: "admin",
    });

    await User.create({
      name: "Client User",
      email: "client@example.com",
      password: passwordHash,
      role: "client",
    });
  });

  afterAll(async () => {
    // Limpia la base de datos después de las pruebas
    await User.deleteMany({});
  });

  it("debería autenticar a un admin y redirigir al dashboard de admin", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ email: "admin@example.com", password: "password" });

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe("/admin/dashboard");
  });

  it("debería autenticar a un cliente y redirigir a la página de productos", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ email: "client@example.com", password: "password" });

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe("/products");
  });

  it("debería redirigir al login si las credenciales son incorrectas", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ email: "wrong@example.com", password: "wrongpass" });

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe("/auth/login");
  });
});

describe("GET /auth/logout", () => {
  it("debería destruir la sesión y redirigir al login", async () => {
    // Simular una sesión activa
    const agent = request.agent(app); // Usa `agent` para mantener la sesión entre requests

    // Autenticar un usuario
    await agent.post("/auth/login").send({
      email: "admin@example.com",
      password: "adminpass",
    });

    // Realizar el logout
    const response = await agent.get("/auth/logout");

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe("/auth/login");
  });
});
