const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Product = require("../models/Product");

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
  await Product.deleteMany();
});

// Desconexión después de todas las pruebas
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Tests del Model Product", () => {
  test("Debe crear un producto válido", async () => {
    const validProduct = new Product({
      name: "Teclado Mecánico",
      description: "Un teclado mecánico de alta calidad",
      category: "Perifericos",
      price: 120,
      stock: 10,
    });

    const savedProduct = await validProduct.save();
    expect(savedProduct._id).toBeDefined();
    expect(savedProduct.name).toBe("Teclado Mecánico");
    expect(savedProduct.category).toBe("Perifericos");
  });

  test("Debe fallar si la categoría no es válida", async () => {
    const invalidProduct = new Product({
      name: "Teclado Invalido",
      description: "Este producto tiene una categoría no válida",
      category: "Inválida",
      price: 50,
      stock: 5,
    });

    let error;
    try {
      await invalidProduct.save();
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
    expect(error.errors["category"]).toBeDefined();
    expect(error.errors["category"].message).toContain(
      "`Inválida` is not a valid enum value"
    );
  });

  test("Debe establecer valores predeterminados correctamente", async () => {
    const defaultProduct = new Product({
      name: "Producto con valores por defecto",
    });

    const savedProduct = await defaultProduct.save();
    expect(savedProduct.description).toBeUndefined(); // No se establece si no se provee
    expect(savedProduct.category).toBeUndefined(); // Valor por defecto del enum
    expect(savedProduct.price).toBe(0); // Valor por defecto
    expect(savedProduct.stock).toBe(0); // Valor por defecto
  });

  test("Debe fallar si el precio es negativo", async () => {
    const productWithNegativePrice = new Product({
      name: "Producto negativo",
      description: "Un producto con precio negativo",
      category: "Procesadores",
      price: -100,
      stock: 5,
    });

    let error;
    try {
      await productWithNegativePrice.save();
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
    expect(error.errors["price"]).toBeDefined();
  });

  test("Debe actualizar un producto existente", async () => {
    const product = new Product({
      name: "Producto inicial",
      description: "Descripción inicial",
      category: "Equipos",
      price: 200,
      stock: 20,
    });

    const savedProduct = await product.save();

    savedProduct.name = "Producto actualizado";
    savedProduct.price = 250;
    const updatedProduct = await savedProduct.save();

    expect(updatedProduct.name).toBe("Producto actualizado");
    expect(updatedProduct.price).toBe(250);
  });
});
