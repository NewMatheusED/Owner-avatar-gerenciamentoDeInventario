import express from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { specs } from '../utils/swagger.js';
import { createProduct } from '../utils/db.js';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.use(bodyParser.json());
    
    // Configuração do Swagger UI
    server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    /**
     * @swagger
     * /api/hello:
     *   get:
     *     summary: Retorna uma mensagem de saudação
     *     parameters:
     *       - in: query
     *         name: name
     *         schema:
     *           type: string
     *         description: Nome para personalizar a saudação
     *     responses:
     *       200:
     *         description: Mensagem de saudação
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     */
    server.get('/api/hello', (req, res) => {
        const { name } = req.query;
        if (name) {
            return res.json({ message: `Hello ${name}!` });
        } else {
            return res.json({ message: 'Hello from Express!' });
        }
    });

    /**
     * @swagger
     * /api/product:
     *   get:
     *     summary: Cria um novo produto
     *     responses:
     *       200:
     *         description: Produto criado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Produto'
     */
    server.get('/api/product', async (req, res) => {
        const product = await createProduct();
        res.json(product);
    });

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    const port = process.env.PORT || 3000;
    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
        console.log(`> Documentação da API disponível em http://localhost:${port}/api-docs`);
    });
});
