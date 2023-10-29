const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const uri = "mongodb://127.0.0.1:27017/vaibhav"

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded());

mongoose.connect(uri);
const conn = mongoose.connection;
conn.on("Connected", () => {
    console.log("Connecteed with mongo db");
})

const productSchema = new mongoose.Schema(
    {
        productId: String,
        productImage: String,
        productName: String,
        productCategory: String,
        productPrice: String
    }
)

const productModel = mongoose.model("productModel", productSchema, "Shop")

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html", null, (err) => {
        if (!err)
            res.end();
    });
})
app.get('/api/getProducts',(req,res)=>
{
    productModel.find().then((data)=>
    {
        res.json(data,null,(err)=>
        {
            if(!err)
                res.end();
        })
    })
})
app.post('/api/insertProduct', async function (req, res) {
    let product = new productModel();
    product.productId = req.body.productId;
    product.productName = req.body.productName
    product.productImage = req.body.productImage
    product.productCategory = req.body.productCategory
    product.productPrice = req.body.productPrice

    const data = await product.save();
    res.redirect('/',null,(err)=>{
        if(!err)
            res.end();
    })
})
app.delete('/api/deleteProduct/:id',function(req,res)
{
    productModel.deleteOne({productId:req.params.id}).then((err,data)=>{
        res.redirect('/',null,(err)=>
        {
            if(!err)
                res.end();
        })
    })
})
app.put('/api/updateProduct/:id/:name/:image/:category/:price',function(req,res){
    console.log(req.body);
    productModel.updateOne({productId:req.params.id},
        {
        productName: req.params.name,
        productImage:req.params.image,
        productCategory:req.params.category,
        productPrice:req.params.price,
    }
        ).then((err,data)=>
    {
        
        res.json(data,null,(err)=>{
            if(!err)
                res.end();
        })
    })
})
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})