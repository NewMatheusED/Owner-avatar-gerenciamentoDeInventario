import swaggerJsdoc from 'swagger-jsdoc';
import { version } from '../package.json';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sistema de Gestão de Estoque API',
      version,
      description: 'Documentação da API do sistema de gestão de estoque',
      contact: {
        name: 'Suporte',
        email: 'suporte@exemplo.com'
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento'
      }
    ],
    components: {
      schemas: {
        Usuario: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nome: { type: 'string' },
            email: { type: 'string' },
            nivelPermissao: { 
              type: 'string',
              enum: ['administrador', 'estoquista', 'financeiro']
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Produto: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nome: { type: 'string' },
            descricao: { type: 'string' },
            quantidadeEstoque: { type: 'integer' },
            quantidadeMinima: { type: 'integer' },
            preco: { type: 'number' },
            fornecedorId: { type: 'integer' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        }
      }
    }
  },
  apis: ['./api/**/*.js', './api/**/*.ts'] // Arquivos que contêm as anotações do Swagger
};

export const specs = swaggerJsdoc(options); 