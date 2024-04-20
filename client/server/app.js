const express = require('express');
const cors = require('cors');
const {MongoClient} = require('mongodb');
const fileupload = require('express-fileupload');

const app = express();  
app.use(express.json());
app.use(cors());
app.use(fileupload());

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on the port number ${PORT}`));

//Configuration (MONGODB)
var curl = "mongodb://localhost:27017";
var client = new MongoClient(curl); 

//REGISTRATION MODULE
app.post('/registration/signup', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('BidX');
        users = db.collection('users');
        data = await users.insertOne(req.body);
        conn.close();
        res.json("Registered successfully...");
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//LOGIN
app.post('/login/signin', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('BidX');
        users = db.collection('users');
        data = await users.count(req.body);
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//Forgot password
app.post('/login/fp', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('BidX');
        users = db.collection('users');
        data = await users.updateOne({username : req.body.username}, {$set : {pwd : req.body.pwd}});
        conn.close();
        res.json("Password has been updated");
    }catch(err)
    {
        res.json(err).status(404);
    }
});


//MY PROFILE
app.post('/profile', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('BidX');
        users = db.collection('users');
        data = await users.find(req.body).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});


//FILE UPLOAD
app.post('/uploaddp', async function(req, res){
    try
    {
        if(!req.files)
            return res.json("File not found");

        let myfile = req.files.myfile;
        var fname = req.body.fname;
        myfile.mv('../public/images/photo/'+ fname +'.jpg', function(err){
            if(err)
                return res.json("File upload operation failed!");

            res.json("File uploaded successfully...");
        });

        conn = await client.connect();
        db = conn.db('BidX');
        users = db.collection('users');
        data = await users.updateOne({username: fname},{$set : {imgurl: fname + '.jpg'}});
        conn.close();
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//Bid Creation MODULE
app.post('/createBid', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('BidX');
        bids = db.collection('bids');
        data = await bids.insertOne(req.body);
        conn.close();
        res.json("Created a bid successfully...");
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//Bid Pic
const fs = require('fs');
const path = require('path');

app.post('/uploadBid', async function(req, res) {
    try {
        if (!req.files)
            return res.json("File not found");

        let myfile = req.files.myfile;
        var fname = req.body.fname;
        var pname = req.body.pname;

        // Check if directory exists, if not, create it
        const directory = '../public/images/bids/' + fname;
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }

        const newPath = path.join(directory, pname + '.jpg');
        myfile.mv(newPath, function(err) {
            if (err)
                return res.json("File upload operation failed!");

            res.json("File uploaded successfully...");
        });

        conn = await client.connect();
        db = conn.db('BidX');
        bids = db.collection('bids');
        await bids.updateOne({ Pproduct: pname }, { $set: { Pimgurl: pname + '.jpg' } });
        conn.close();
    } catch (err) {
        res.json(err).status(404);
    }
});


//Dashboard
app.post('/home/dashboard', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('BidX');
        bids = db.collection('bids');
        data = await bids.find({}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//loadUname
app.post('/home/uname', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('BidX');
        users = db.collection('users');
        data = await users.find(req.body, {projection:{username: true, imgurl:true}}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

