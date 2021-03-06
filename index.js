const express = require('express')
const { MongoClient } = require('mongodb');
const cors =require("cors")
const app = express();
const ObjectId = require("mongodb").ObjectId;
const port = process.env.PORT || 5000
// const port =  5000
require('dotenv').config();

// middleware 

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSOWRD}@cluster0.4bmge.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

console.log(uri)

const client = new MongoClient(uri, {  useNewUrlParser: true, useUnifiedTopology: true }); 



async function run (){

try{
    await client.connect();
  
    const packagesCollection = client.db("torisumDB").collection("packages");
  const orderCollection = client.db("torisumDB").collection("orders");


        // post api 
        app.post('/package', async(req, res)=>{
            const package = req.body
           console.log("hit thw poar api", package);
            const result =await packagesCollection.insertOne(package)
            console.log(result);
            res.json(result)
        })
        
        // post api 
        app.post('/order', async(req, res)=>{
            const orderNew = req.body
           console.log("hit thw poar api", orderNew);
            const resultOrder =await orderCollection.insertOne(orderNew)
            console.log(resultOrder);
            res.json(resultOrder)
        })
        
    // get api 
    app.get('/package', async (req, res)=>{
        const cursor = packagesCollection.find({})
        const products = await cursor.toArray();
        res.send(products)

    })
    // get api 
    app.get('/order', async (req, res)=>{
        const cursor = orderCollection.find({})
        const getOrder = await cursor.toArray();
        res.send(getOrder)

    })
    // get api 
    app.get('/order/:email', async (req, res)=>{
        console.log(req.params.email);
        const cursor = orderCollection.find({email: req.params.email})
        const getOrder = await cursor.toArray();
        res.send(getOrder)

    })

      // delete event

  app.delete("/deleteOrder/:id", async (req, res) => {
    console.log(req.params.id);
    const result = await orderCollection.deleteOne({
      _id: ObjectId(req.params.id),
    });
    res.send(result);
  });


}
finally{
    // await cllient.close()
}
}

run().catch(console.dir)

app.get('/', (req, res)=>{
    res.send("Assignment server is running")
})



app.listen(port, ()=>{
    console.log("Server Running Port", port);
})

;