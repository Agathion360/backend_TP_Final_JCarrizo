import { Router } from "express";
import Carts from "../carts.js";

const cartManager = new Carts('./src/json/carts.json');
const router = Router();


router.post('/', async (req, res) => {
    try {
        const cart = await cartManager.addCart();
        res.status(200).send(cart);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try{
        const carts = await cartManager.initCart();
        res.status(200).send(carts);
    }catch(error){
        res.status(500).send({ error: error.message }); 
    }
});



router.get('/:cid', async (req, res) => {
    try{
        const id = parseInt(req.params.cid);
        if (isNaN(id)) {
            res.status(400).send({ error: 'El id del carrito debe ser un número' });
            return;
        }
        const cart = await cartManager.getCartById(id);
        if (!cart) {
            res.status(404).send({ error: 'no se encontro el carrito' });
        } else {
            res.status(200).send(cart);
        }
    }catch(error){
        res.status(500).send({ error: error.message }); 
    }
});

router.post('/:cid/products/:pid', async (req, res) => {
    try{
        const cid = parseInt(req.params.cid);
        const pid = parseInt(req.params.pid);
        const quantity = parseInt(req.body.quantity);
        const cart = await cartManager.addProductInCart(cid, pid, quantity);
        if (!cart) {
            res.status(404).send({ error: 'no se encontro el carrito' });
        } else {
            res.status(200).send(cart);
        }
    }catch(error){
        res.status(500).send({ error: error.message }); 
    }
});


export default router;