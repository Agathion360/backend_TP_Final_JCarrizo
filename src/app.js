import express from 'express';
import products from './routes/products.routes.js';
import carts from './routes/carts.routes.js';



const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//endpoints
app.use('/api/products', products);
app.use('/api/carts', carts);


//si no encuentra la ruta va por defecto aca
app.get('*', (req, res) => {
    res.status(400).send(`<h1 style="color:red">Pagina no encontrada</h1>`)
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
