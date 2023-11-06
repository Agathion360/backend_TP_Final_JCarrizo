import fs from 'fs';

export default class Carts {
  constructor(path) {
    this.path = path;
    this.carts = [];
    this.initCart().catch(error => console.error("Error al inicializar el archivo:", error.message));
  }

  async initCart() {
    try {
      const cartData = await fs.promises.readFile(this.path, 'utf-8');
      this.carts = JSON.parse(cartData);
    } catch (error) {
      console.error("Error al leer el archivo:", error.message);
    }
  }

  async createCart() {
    try {
      const maxId = this.carts.length > 0 ? Math.max(...this.carts.map(cart => cart.id)) : 0;
      const cart = {
        id: maxId + 1,
        products: []
      };
      this.carts.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2));
      return cart;
    } catch (error) {
      console.error("Error al crear el carrito:", error.message);
    }
  }

  async getCarts() {
    try {
      return this.carts;
    } catch (error) {
      console.error("Error al obtener los carritos:", error.message);
    }
  }

  async getCartById(id) {
    try {
      return this.carts.find(cart => cart.id === id);
    } catch (error) {
      console.error("Error al obtener el carrito:", error.message);
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = this.carts.find(cart => cart.id === cartId);
      if (!cart) {
       return await this.createCart();
      }

      const productIndex = cart.products.findIndex(product => product.product === productId);
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2));
      return cart;
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error.message);
    }
  }
}
