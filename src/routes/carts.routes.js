import { Router } from "express";
import Carts from "../carts.js";

const cartManager = new Carts('./src/json/carts.json');
const router = Router();

router.get('/carts', (req, res) => {
    const carts = cartManager.getCarts();
    res.status(200).send(carts);
});

router.get('/carts/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const cart = await cartManager.getCartById(id);
    if (!cart) {
        res.status(404).send({ error: 'no se encontro el carrito' });
    }
    res.status(200).send(cart);
});

router.post('/carts/:cid/products/:pid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const quantity = parseInt(req.body.quantity);
    const cart = await cartManager.addProductToCart(cartId, productId, quantity);
    res.status(200).send(cart);
});


export default router;