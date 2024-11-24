const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");

let mongoServer;

// Configuración antes de las pruebas
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Crea un usuario de prueba
  this.testUser = await User.create({
    name: "Test User",
    email: "test@example.com",
    password: "password123",
    role: "client",
  });

  // Crea un producto de prueba
  this.testProduct = await Product.create({
    name: "Test Product",
    description: "Producto de prueba",
    category: "Perifericos",
    price: 100,
    stock: 50,
  });
});

// Limpieza después de cada test
afterEach(async () => {
  await Order.deleteMany();
});

// Desconexión después de todas las pruebas
afterAll(async () => {
  // Limpia colecciones relacionadas y desconecta la base de datos
  await User.deleteMany();
  await Product.deleteMany();
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Tests del Model Order", () => {
  test("Debe crear una orden válida", async () => {
    const validOrder = new Order({
      userId: this.testUser._id,
      products: [
        {
          productId: this.testProduct._id,
          name: this.testProduct.name,
          quantity: 2,
          price: this.testProduct.price,
        },
      ],
      totalPrice: 200,
    });

    const savedOrder = await validOrder.save();
    expect(savedOrder._id).toBeDefined();
    expect(savedOrder.status).toBe("Recibido"); // Valor por defecto
    expect(savedOrder.totalPrice).toBe(200);
  });

  test("Debe fallar si falta el userId", async () => {
    const invalidOrder = new Order({
      products: [
        {
          productId: this.testProduct._id,
          name: this.testProduct.name,
          quantity: 1,
          price: this.testProduct.price,
        },
      ],
      totalPrice: 100,
    });

    let error;
    try {
      await invalidOrder.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors["userId"]).toBeDefined();
  });

  test("Debe fallar si la cantidad del producto es menor a 1", async () => {
    const invalidOrder = new Order({
      userId: this.testUser._id,
      products: [
        {
          productId: this.testProduct._id,
          name: this.testProduct.name,
          quantity: 0, // Cantidad inválida
          price: this.testProduct.price,
        },
      ],
      totalPrice: 100,
    });

    let error;
    try {
      await invalidOrder.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors["products.0.quantity"]).toBeDefined();
  });

  test("Debe asignar valores por defecto correctamente", async () => {
    const orderWithDefaults = new Order({
      userId: this.testUser._id,
      products: [
        {
          productId: this.testProduct._id,
          name: this.testProduct.name,
          quantity: 1,
          price: this.testProduct.price,
        },
      ],
      totalPrice: 100,
    });

    const savedOrder = await orderWithDefaults.save();
    expect(savedOrder.createdAt).toBeDefined(); // Valor por defecto
    expect(savedOrder.status).toBe("Recibido"); // Valor por defecto
  });

  test("Debe actualizar el estado de una orden", async () => {
    const order = new Order({
      userId: this.testUser._id,
      products: [
        {
          productId: this.testProduct._id,
          name: this.testProduct.name,
          quantity: 1,
          price: this.testProduct.price,
        },
      ],
      totalPrice: 100,
    });

    const savedOrder = await order.save();
    savedOrder.status = "Enviado";
    const updatedOrder = await savedOrder.save();

    expect(updatedOrder.status).toBe("Enviado");
  });

  test("Debe fallar si el estado no es válido", async () => {
    const invalidOrder = new Order({
      userId: this.testUser._id,
      products: [
        {
          productId: this.testProduct._id,
          name: this.testProduct.name,
          quantity: 1,
          price: this.testProduct.price,
        },
      ],
      totalPrice: 100,
      status: "Invalido", // Estado inválido
    });

    let error;
    try {
      await invalidOrder.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors["status"]).toBeDefined();
  });
});
