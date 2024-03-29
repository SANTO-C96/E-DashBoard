const express = require('express');
const cors = require("cors");
require('./db/config');
const User = require('./db/User');
const Product = require("./db/Product");

const jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';

const app = express();

app.use(express.json());
app.use(cors(
    {
      origin:["https://e-dash-board-frontend.vercel.app"],
      methods: ["POST","GET","PUT","DELETE"],
      credentials: true
   }
));

app.get('/',(req,res)=>{
    res.send({result:"Hello From the Backend"});
})

app.post("/register", async (req,res)=>{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
        jwt.sign( {result}, jwtKey, {expiresIn: "2h"}, (err,token)=>{
          if(err){
              res.send({result: "something went wrong, please try after some time "})
          }
          res.send({ result, auth: token})
        })
})

app.post("/login",async (req,res)=>{
    if(req.body.password && req.body.email){

        let user = await User.findOne(req.body).select("-password");
    if(user){
          jwt.sign( {user}, jwtKey, {expiresIn: "2h"}, (err,token)=>{
            if(err){
                res.send({result: "something went wrong, please try after some time "})
            }
            res.send({ user, auth: token})
          })
    }else{
        res.send({result:'No User Found'});
    }
    }
    else{
        res.send({result:"please enter valid credentials"});
    }
})

app.post("/add-product", async(req,res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
});

app.get('/products', async (req,res)=>{
    let products = await Product.find();
    if(products.length>0){
        res.send(products)
    }else{
        res.send({results:"No Products found"})
    }
});

app.delete("/product/:id",async(req,res)=>{
    const result = await Product.deleteOne({_id:req.params.id})
    res.send(result);
});

app.get("/product/:id", async(req,res)=>{
    let result = await Product.findOne({_id:req.params.id});
    if(result){
        res.send(result);
    }
    else{
        res.send({result:"No Record Found."})
    }
});

app.put("/product/:id", async (req,res)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {
            $set: req.body
        }
    )

    res.send(result);
});

app.get("/search/:key", verifyToken, async(req,res) =>{
    let result = await Product.find({
        "$or": [
            {name: {$regex: req.params.key}},
            {company: {$regex: req.params.key}},
            {category: {$regex: req.params.key}}
        ]
    });
    res.send(result)
});

function verifyToken(req,res,next){
    let  token = req.headers['authorization'];
    if(token){
        token = token.split(' ');
        jwt.verify(token, jwtKey, (err, valid)=>{
            if(err){
                res.send({result: "Please Provide Valid Token"})
            }
            else{
                next();
            }
        })
        
    }
    else{
        res.send({result: "Please add token with header"});
    }
    
}

 

app.listen(5000,()=>{
    console.log("Server listion on port number 50000");
});
