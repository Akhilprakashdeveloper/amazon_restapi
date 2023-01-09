let express = require('express');
let app = express();
let cors=require('cors');
let dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 7800;
let mongo=require('mongodb');
const { response } = require('express');
let MongoClient = mongo.MongoClient;
let mongoUrl=process.env.LocalMongo;
let db;
let bodyparser=require('body-parser');
const bodyParser = require('body-parser');
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors());


app.get('/',(req,res)=>{
    db.collection('amazondata').find().toArray((err,result)=>{
        if(err) throw err
        res.send(result)
    })
})


//page1

app.get('/category',(req,res)=>{
    db.collection('category').find().toArray((err,result)=>{
        if(err) throw err
        res.send(result);
    })
})



//page2

app.get('/products',(req,res)=>{
    db.collection('amazondata').find().toArray((err,result)=>{
        if(err) throw err
        res.send(result)
    })
})

app.get('/products/:categoryId',(req,res)=>{
    let categoryId=Number(req.params.categoryId);
    db.collection('amazondata').find({category_id:categoryId}).toArray((err,result)=>{
        if(err) throw err
        res.send(result);
    })
})



app.get('/product',(req,res)=>{
   let category=Number(req.query.category);
   let brand=req.query.brand;
   let ram=Number(req.query.ram);
   let storage=Number(req.query.storage);
   let processor=req.query.processor;
   let colour=req.query.colour;
   let type=req.query.type;
   let author=req.query.author;
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
   else{
    query={};
   }

    db.collection('amazondata').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result);
    })
})



app.get('/filter/:categoryId',(req,res)=>{
    let categoryId=Number(req.params.categoryId)
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
    db.collection('amazondata').find(query).sort(sort).toArray((err,result)=>{
        if(err) throw err
        res.send(result)
    })
})



//page 3

app.get('/productdetail/:productId',(req,res)=>{
    let productId=Number(req.params.productId);
    db.collection('amazondata').find({id:productId}).toArray((err,result)=>{
        if(err) throw err
        res.send(result);
    })
})



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






//Database connection



MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.log('Error while connecting');
    db = client.db('amazon');
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`)
    })

})




