import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testProduct() {
  try {
    // Проверяем, есть ли модель product
    console.log("Available models:", Object.keys(prisma));
    
    // Пытаемся получить доступ к модели product
    const products = await prisma.product.findMany();
    console.log("Products found:", products.length);
  } catch (error) {
    console.error("Error:", error);
  }
}

testProduct();
