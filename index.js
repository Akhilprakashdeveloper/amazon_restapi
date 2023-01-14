let express = require('express');
let app = express();
let cors=require('cors');
let dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 7800;
let mongoUrl=process.env.LiveMongo;
const category=require('./models/categorymodel');
const amazondata=require('./models/amazondatamodal');
const users=require('./models/userModal');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors());
const mongoose=require('mongoose');
const { response } = require('express');
mongoose.set('strictQuery', true);
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');


mongoose.connect(mongoUrl).then((result)=>{
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`)
    })
}).catch((err)=>{
    console.log('there is an error',err)
})



//page1

app.get('/',(req,res)=>{
    amazondata.find((err,result)=>{
        if(err) throw err
        res.send(result);
      })
})


app.get('/category',(req,res)=>{
    category.find((err,result)=>{
        if(err) throw err
        res.send(result);
      })
})



//page2

app.get('/products',(req,res)=>{
    amazondata.find((err,result)=>{
        if(err) throw err
        res.send(result);
      })
})


app.get('/products/:categoryId', (req, res) => {
    let categoryId = Number(req.params.categoryId);
    amazondata.find({category_id:categoryId}, (err, result) => {
        if(err) throw err
        res.send(result);
    });
});


app.get('/product',(req,res)=>{
   let category=req.query.category;
   let brand=req.query.brand;
   let ram=req.query.ram;
   let storage=req.query.storage;
   let processor=req.query.processor;
   let colour=req.query.colour;
   let type=req.query.type;
   let author=req.query.author;
   let book_name=req.query.bookname;
   let query={}
   if(category&&brand)
   {
    query={category_id:category,brand}
   }
   else if(category&&ram)
   {
    query={category_id:category,ram}
   }
   else if(category&&storage)
   {
    query={category_id:category,storage}
   }
   else if(category&&processor)
   {
    query={category_id:category,processor}
   }
   else if(category&&colour)
   {
    query={category_id:category,colour}
   }
   else if(category&&type)
   {
    query={category_id:category,type}
   }
   else if(category&&author)
   {
    query={category_id:category,author}
   }
   else if(category&&book_name)
   {
    query={category_id:category,book_name}
   }
   else{
    query={};
   }

    amazondata.find(query,(err,result) => {
        if(err) throw err;
        res.send(result);
    })
})



app.get('/filter/:categoryId',(req,res)=>{
    let categoryId=req.params.categoryId;
    let hcost=Number(req.query.hcost);
    let lcost=Number(req.query.lcost);
    let sort={price:1};
    let query={};

    if(categoryId && lcost && hcost)
    {
        query={category_id:categoryId,$and:[{price:{$gt:lcost,$lt:hcost}}]}
    }
   
     else if(categoryId){
        query={category_id:categoryId}
    }
    else{
        query={};
    }
    amazondata.find(query,{}).sort(sort).exec((err,result)=>{
        if(err) throw err
        res.send(result)
    })
})



//page 3

app.get('/productdetail/:productId',(req,res)=>{
    let productId=Number(req.params.productId);
    amazondata.find({id:productId},(err,result)=>{
        if(err) throw err
        res.send(result);
    })
})




app.post('/register',(req,res) => {
    users.find({email:req.body.email},(err,data) => {
        if(err) throw err;
        if(data.length>0){
            res.send('Email already Taken')
        }else{
             
                let hashpassword = bcrypt.hashSync(req.body.password,8);
                users.create({
                    name:req.body.name,
                    email:req.body.email,
                    password:hashpassword,
                    phone:req.body.phone,
                    role:req.body.role?req.body.role:'User'
    
                },(err,data) => {
                    if(err) return res.send('Error While Register');
                    res.send('Registion Successful')
                })
        }
    })
})




























/*
//page 4

app.post('/checkoutupdate',(req,res)=>{
    db.collection('checkout').insert(req.body,(err,result)=>{
        if(err) throw err
        res.send('checkout details updated');
    })
})



app.get('/checkout',(req,res)=>{
    db.collection('checkout').find().toArray((err,result)=>{
        if(err) throw err
        res.send(result);
    })
})


app.post('/placeorder',(req,res)=>{
    db.collection('orders').insert(req.body,(err,result)=>{
        if(err) throw err
        res.send('order placed successfully');
    })
})



app.get('/orders',(req,res)=>{
    db.collection('orders').find().toArray((err,result)=>{
        if(err) throw err
        res.send(result);
    })
})



//page 5

app.get('/order',(req,res)=>{
    let email=req.query.email;
    let query={};
    if(email)
    {
       query={email:email}
    }
    else
    {
        query={}
    }
 db.collection('orders').find(query).toArray((err,result)=>{
    if(err) throw err
    res.send(result);
 })
})



app.put('/updateorder/:id',(req,res)=>{
     let oid=Number(req.params.id);
     db.collection('orders').updateOne({orderId:oid},{$set:{"status":req.body.status,"bank_name":req.body.bank_name,"date":req.body.date}},(err,result)=>{if(err) throw err 
    res.send('order updated succefully')})
})



app.delete('/deleteorder/:id',(req,res)=>{
    let _id=mongo.ObjectId(req.params.id);
    db.collection('orders').remove({_id},(err,result)=>{
        if(err) throw err
        res.send('order deleted succefully');
    })
})
*/
