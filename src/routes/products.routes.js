import { Router } from "express";
import ProductManager from "../productManager.js";





const productManager = new ProductManager('./src/send/productos.send');
const router = Router();

// Middleware para verificar la propiedad code duplicados en el body
const checkId = () => {
  return async(req, res, next) => {
    try{
        const code = req.body.code
        const products = await productManager.getProducts() //aca utilizo el metodo Get d emi productManager
        const product = products.find(product => product.code === code)//aca busco el producto que tenga el mismo code que el que estoy recibiendo por body
        if(product){
            return res.status(400).send(`<h1 style="color:red">ya existe un  producto con este codigo  ${code}</h1>`)
        }
        next()

    }catch(error){
        console.error("Error al verificar el code:", error.message)
    }
}
}

router.post('/products', checkId(), async (req, res) => {
  const product = req.body;
  await productManager.addProduct(product);
  res.status(201).send(product);
});


router.get('/products', async (req, res) => {
    
 const products = await productManager.getProducts();
 const limit = parseInt(req.query.limit);

        if (!isNaN(limit)) {
            res.status(200).send(products.slice(0, limit));
           
        }else{
            res.status(200).send(products);
        }
});





router.get('/products/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    const product = await productManager.getProductsById(pid);
    product? res.status(200).send(product) : res.status(404).send({ error: 'Producto no encontrado' });

});


router.put('/products/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    await productManager.updateProduct(pid, req.body);
    res.status(200).send("Producto actualizado con éxito.");
});


router.delete('/products/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    await productManager.deleteProduct(pid);
    res.status(200).send("Producto eliminado con éxito.");
});


export default router;