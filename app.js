var fs = require('fs');
const express = require('express');
const {connectToDb,getDb} = require('./db');
const { ObjectId } = require('mongodb');
const  get  = require('http');

/*fs.readFile('calc.js','utf-8',function(err,data){
    console.log(data);
});

fs.writeFile('calc1.js','console.log("Hai Hello")',function(err){
    console.log('Done')
});
fs.appendFile('calc.js','console.log("Hai Hello");',function(err){
    console.log('Append Done')
});*/
// DB Connection
let db
const app = express();
app.use(express.json())
const PORT = process.env.PORT || 9000 // Port Of the server Default is 3000
connectToDb((err) =>
{
    if (!err)
    {
        app.listen(PORT,(req,res) => {
         //   res.wr("Welcome to API")
          //  res.end();
        });
         db = getDb()
    }
    else{
        console.log(err);
    }
})
app.get('/',function(req,res)
{
    res.send('Hello World');
    res.end();
});
//app.listen(3000)
app.get('/satz',(req,res) =>
{
    let books = []
    db.collection('Books').find().sort({author : 1})
    .forEach(book => {
        books.push(book)
    }).then(()=> {
        res.status(200).json(books)
    }).catch(()=>
    {
      res.status(500).json({error:"Could Not Be Connect"})
    }
    )
    // Insert the document 
    var myobj = [{ name: "Company Inc", address: "Highway 37" },{ name: "Company Inc", address: "Highway 37" }];
    db.collection('Books').insertMany(myobj, (err,res) => {
        res.send('Successfull Inserted')
    })
});
// Delete The document
app.get('/Book/:id',(req,res) =>
{
    if(ObjectId.isValid(req.params.id))
    {
        db.collection('Books').deleteOne({_id : new ObjectId(req.params.id)})
        .then((doc) =>
        {
            res.status(200).json(doc);
        }).catch((err) =>
        {
            res.status(500).json({error : 'No Record Found'});
        }
        )
    }
    else{
        res.status(500).json({error : 'Not a valid Document'})
    }
    
});
//  Insert the Document
app.post('/Bookpost',(req,res) =>{
    const book =  req.body
    db.collection('Books').insertOne(book).then(result => {
        res.status(200).json(result)
    }).catch(err => {
        res.status(500).json({Error : 'Record Not Insertedss'})
    })
});

// Delete the Document
app.get('/BookDel/:id',(res,req) =>{
    if(ObjectId.isValid(req.params.id))
    {
        db.collection('Books').deleteOne({_id : new ObjectId(req.params.id)}).then(result => {
            res.status(200).json(result).catch(err => {
                res.status(500).json({Error : 'Record Not Deleted'})
            })
        })
    }
    else
    {
        res.status(500).json({error : 'Not a valid document'})
    }
});

// Update the Document
app.patch('/BookUpdate/:id',(req,res) =>
{
    const  UpdateBody = req.body
    if(ObjectId.isValid(req.params.id))
    {
        db.collection('Books').updateOne({_id : new ObjectId(req.params.id)},{$set : UpdateBody} )
        .then((doc) =>
        {
            res.status(200).json(doc);
        }).catch((err) =>
        {
            res.status(500).json({error : 'No Record Found'});
        }
        )
    }
    else{
        res.status(500).json({error : 'Not a valid Document'})
    }
    
});
//app.listen(9000);