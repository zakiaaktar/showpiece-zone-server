const express = require('express')
const cors = require('cors');
// const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 4000;


// middle wares
app.use(cors());
app.use(express.json());






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xwlx9fx.mongodb.net/?retryWrites=true&w=majority`;
//console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try{
        const productCollection = client.db('showpieceZone').collection('products');
        const orderCollection = client.db('showpieceZone').collection('orders');



        app.get('/products', async (req, res) => {
            const query = {}
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });


        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await productCollection.findOne(query);
            res.send(product);
        });


        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.send(result);
        });



        
    }
    finally{

    }
}
run().catch(err => console.error(err));





app.get('/', (req, res) => {
    res.send('showpiece zone server is running');
});

app.listen(port, () => {
    console.log(`showpiece zone server running on ${port}`);
})