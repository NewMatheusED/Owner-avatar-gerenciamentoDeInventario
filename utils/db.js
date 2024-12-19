import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createProduct() {
  const produto = await prisma.produto.create({
    data: {
      nome: "Caneta Azul",
      descricao: "Caneta esferográfica azul",
      quantidadeEstoque: 100,
      quantidadeMinima: 10,
      preco: 1.5,
      fornecedor: {
        create: {
          nome: "Fornecedor ABC",
          email: "contato@abc.com",
          telefone: "123456789",
          endereco: "Rua Exemplo, 123"
        }
      }
    }
  });
  return produto;
}
