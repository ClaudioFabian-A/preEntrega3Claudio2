import express from "express"
import productManager from "./managers/productManager.js"
const app = express()
const PORT = 8080;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.listen(PORT, () => {
    console.log(`escuchando en puerto ${PORT}`)
})

const manager = new productManager("./files/products.json");


app.get('/products', async (req, res) => {
    const { limit } = req.query;
    const products = await manager.getProducts();
    const part = products.slice(0, limit)
    limit ? res.status(200).json(part) : res.status(200).json(products)
});


app.get('/products/:id', async (req, res) => {
    const prodID = parseInt(req.params.id)
    const product = await manager.getProductById(prodID)
    product ? res.status(200).json(product) : res.status(400).json({ message: "Product not found" })
});


