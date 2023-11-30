import { Router } from "express";
import { ProductController } from '../controllers/product.controller.js'




// import ProductManager from "../productManager.js";


// const productManager = new ProductManager('./src/json/productos.json');

// const router = Router();


// // Middleware para verificar la propiedad code duplicados en el body
// const checkId = () => {
//   return async(req, res, next) => {
//     try{
//         const code = req.body.code
//         const products = await productManager.getProducts() //aca utilizo el metodo Get d emi productManager
//         const product = products.find(product => product.code === code)//aca busco el producto que tenga el mismo code que el que estoy recibiendo por body
//         if(product){
//             return res.status(400).send(`<h1 style="color:red">ya existe un  producto con este codigo  ${code}</h1>`)
//         }
//         next()

//     }catch(error){
//         console.error("Error al verificar el code:", error.message)
//     }
// }
// }

// router.post('/', checkId(), async (req, res) => {
//   const product = req.body;
//   await productManager.addProduct(product);
//   res.status(201).send(product);
// });


// router.get('/', async (req, res) => {
    
//  const products = await productManager.getProducts();
//  const limit = parseInt(req.query.limit);

//         if (!isNaN(limit)) {
//             res.status(200).send(products.slice(0, limit));
           
//         }else{
//             res.status(200).render('products',{});
//         }
// });





// router.get('/:pid', async (req, res) => {
//     const pid = parseInt(req.params.pid);
//     const product = await productManager.getProductsById(pid);
//     product? res.status(200).send(product) : res.status(404).send({ error: 'Producto no encontrado' });

// });


// router.put('/:pid', async (req, res) => {
//     const pid = parseInt(req.params.pid);
//     await productManager.updateProduct(pid, req.body);
//     res.status(200).send("Producto actualizado con éxito.");
// });


// router.delete('/:pid', async (req, res) => {
//     const pid = parseInt(req.params.pid);
//     await productManager.deleteProduct(pid);
//     res.status(200).send("Producto eliminado con éxito.");
// });





const router = Router();
const productController = new ProductController();

//aca va ka verificacion de los campos que esten llenos etc
router.get('/', async(req, res) => {
   const products = await productController.getProducts();
    // res.status(200).render('products',{});
    res.status(200).send({status:'ok', data: products});
}); 

export default router;

