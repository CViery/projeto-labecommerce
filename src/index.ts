import express, { Request, Response } from "express"
import cors from "cors"
import { db } from "./dataBase/knex";
import { error } from "console";

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na casa do carai");
});

app.get('/users', async (req: Request, res: Response) => {
    try {
        const result = await db("users")
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error)
    }
})
app.post('/user', async (req: Request, res: Response) => {
    try {
        const id = req.body.id as string
        const name = req.body.name as string
        const email = req.body.email as string
        const password = req.body.password as string

        if ( !id || !name || !email) {
            res.status(400)
            throw new Error("Dados Invalidos")
        }

        await db.insert({
            id: id,
            name: name,
            email: email,
            password: password
        }).into("users")
        res.status(200).send({ message: "Cadastro Realizado com sucesso" })
    } catch (error) {
        res.status(400).send(error)
    }
})

app.post('/products', async (req: Request, res: Response) => {
    try {
        const id = req.body.id as string
        const name = req.body.name as string
        const price = req.body.price as number
        const description = req.body.description as string
        const image_url = req.body.image_url as string
        if ( !id || !name || isNaN(price) || !description || !image_url) {
            res.status(400)
            throw new Error("Dados Invalidos")
        }

        await db.insert({
            id: id,
            name: name,
            price: price,
            description: description,
            image_url: image_url
        }).into("products")
        res.status(200).send({ message: "Produto cadastrado com sucesso" })
    } catch (error) {
        res.status(400).send(error)


    }
})

app.get('/products', async (req: Request, res: Response) => {
    try {
        const result = await db("products")
        res.status(200).send(result)
    } catch (error) {
        res.send(400).send(error)
    }
})
app.get('/products/search', async (req: Request, res: Response) => {
   try {
    const name = req.query.name
    const [products] = await db.select("*").from("products").where({name:name})

    res.status(200).send(products)
   } catch (error) {
    res.status(400).send(error)
   }
})
app.put('/product/:id', async (req: Request, res: Response)=>{
    try {
        const id = req.params.id

        const newId = req.body.id
        const newName = req.body.name
        const newPrice = req.body.price
        const newDescription = req.body.description
        const newImage = req.body.image_url

        if(newId !== undefined){
            if (typeof newId !== "string"){
                res.status(400)
                throw new Error("'id' deve ser um number")
            }
            if(newId.length < 1 ){
                res.status(400)
                throw new Error("'id' deve possuir no minimo um caracter")
            }
        }
        if(newName !== undefined){
            if (typeof newName !== "string" ){
                res.status(400)
                throw new Error("'name' deve ser string")
            }
            if( newName.length < 2){
                res.status(400)
                throw new Error("'name' deve ser string")
            }
        }
        if(newPrice !== undefined){
            if(typeof newPrice !== "number" ){
                res.status(400)
                throw new Error("'price' deve ser um number")
            }
            if(newPrice < 0){
                throw new Error("'price' não pode ser negativo")
            }
        }
        if(newDescription !== undefined){
            if (typeof newDescription !== "string" ){
                res.status(400)
                throw new Error("'description' deve ser string")
            }
            if( newDescription.length < 20){
                res.status(400)
                throw new Error("'description' deve ter ao menos dois caractres ")
            }
        }
        if(newImage !== undefined){
            if (typeof newImage !=="string" ){
                res.status(400)
                throw new Error("'ImageUrl' deve ser uma string")
            }
        }
        const [products] = await db.select("*").from("products").where({id:id});
        if(products){
            const updateProduct = {
                id: newId || products.id,
                name: newName || products.name,
                price: isNaN(newPrice) ? products.price : newPrice,
                description: newDescription || products.description,
                imageUrl: newImage || products.imageUrl
            }
            await db("products").update(updateProduct).where({id:id}) 
            console.log(products)
        }else{
            res.status(404)
            throw new Error("'id' não encontrado")
        }
        res.status(200).send("Atualização realizada com sucesso")
    } catch (error) {
        res.status(400).send(error)
    }
})
app.post("/purchase", async (req:Request, res: Response) =>{
    try {
        const id = req.body.id
        const buyer = req.body.buyer
        const total_price = req.body.total_price
    } catch (error) {
        
    }
})