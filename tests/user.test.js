const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../models/User");

let mongoServer;

// Configuración antes de las pruebas
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Limpieza después de cada test
afterEach(async () => {
  await User.deleteMany();
});

// Desconexión después de todas las pruebas
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Tests del Model User", () => {
  it("Debe crear un usuario válido", async () => {
    const validUser = new User({
      name: "Fernando",
      email: "fernando@example.com",
      password: "securepassword123",
    });

    const savedUser = await validUser.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe("Fernando");
    expect(savedUser.email).toBe("fernando@example.com");
    expect(savedUser.role).toBe("client"); // Valor por defecto
  });

  it("Debe fallar al guardar un usuario sin nombre", async () => {
    const userWithoutName = new User({
      email: "no-name@example.com",
      password: "securepassword123",
    });

    let error;
    try {
      await userWithoutName.save();
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
    expect(error.errors.name).toBeDefined();
  });

  it("Debe fallar al guardar un usuario con email duplicado", async () => {
    const user1 = new User({
      name: "User1",
      email: "duplicate@example.com",
      password: "password1",
    });

    const user2 = new User({
      name: "User2",
      email: "duplicate@example.com",
      password: "password2",
    });

    await user1.save();

    let error;
    try {
      await user2.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.code).toBe(11000); // Código de error para duplicados en MongoDB
  });

  it("Debe asignar 'client' como role por defecto", async () => {
    const user = new User({
      name: "Default Role User",
      email: "default-role@example.com",
      password: "password123",
    });

    const savedUser = await user.save();
    expect(savedUser.role).toBe("client");
  });

  it("Debe fallar si el role no es válido", async () => {
    const user = new User({
      name: "Invalid Role User",
      email: "invalid-role@example.com",
      password: "password123",
      role: "invalidRole",
    });

    let error;
    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.role).toBeDefined();
  });
});
