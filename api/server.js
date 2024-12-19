import express from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import { createProduct } from '../utils/db.js';
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.use(bodyParser.json());

    server.get('/api/hello', (req, res) => {
        const { name } = req.query;
        if (name) {
            return res.json({ message: `Hello ${name}!` });
        } else {
            return res.json({ message: 'Hello from Express!' });
        }
    });

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
    });
});
