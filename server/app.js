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

app.post('/home/product', async function(req, res){
    try { // Extract productName from the request body
        conn = await client.connect();
        db = conn.db('BidX');
        users = db.collection('bids');
        data = await users.find(req.body).toArray();
        conn.close();
        res.json(data);
    } catch(err) {
        res.json(err).status(404);
    }
});

//Bid Amount
app.post('/bidAMT', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('BidX');
        partc = db.collection('partc');
        data = await partc.insertOne(req.body);
        conn.close();
        res.json("Bidded Successfully ! 😊\n You will be Notified if You win this Auction");
    }catch(err)
    {
        res.json(err).status(404);
    }
});


//MyBid
app.post('/home/dashboard1', async function(req, res){
    try {
        conn = await client.connect();
        db = conn.db('BidX');
        bids = db.collection('bids');
        
        // Retrieve the username (sid) from the request body
        const { sid } = req.body;
        
        // Fetch products from the database where the username matches sid
        const data = await bids.find({ username: sid }).toArray();
        
        conn.close();
        res.json(data);
    } catch(err) {
        res.status(404).json(err);
    }
});

//Participant list
app.post('/home/participants', async function(req, res) {
    try {
        conn = await client.connect();
        db = conn.db('BidX');
        users = db.collection('partc');
        
        // Sort the data by bidamt in descending order
        const data = await users.find(req.body).sort({ bidamt: -1 }).toArray();
        
        conn.close();
        res.json(data);
    } catch(err) {
        res.json(err).status(404);
    }
});

app.post('/home/dashboard2', async (req, res) => {
    try {
        conn = await client.connect();
        
        db = conn.db('BidX');
        bids = db.collection('partc');
        const { sid } = req.body;
        
        // Fetch products from the database where the username matches sid
        const data = await bids.find({ username: sid }).toArray();
        conn.close();
        res.json(userData);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to your server endpoint for validating the username and phone number
      const response = await axios.post('http://localhost:5000/login/fp', {
        username: username,
        phoneNumber: phoneNumber
      });
      
      // If the response is successful, redirect to the 'BidX/ap1' page
      if (response.status === 200) {
        window.location.href = 'http://localhost:3000/BidX/ap1'; // Assuming React app runs on port 3000
      }
    } catch (err) {
      // If there's an error, display the error message
      setError(err.response.data);
    }
  };

  // Validate Phone Number route
app.post('/validate-phone', async (req, res) => {
    try {
        const { mobileno, username } = req.body;
        
        // Connect to the database
        const conn = await client.connect();
        const db = conn.db('BidX');
        const users = db.collection('users');
        
        // Check if the phone number and username exist in the database
        const user = await users.findOne({ mobileno: mobileno, username: username });

        if (user) {
            // Phone number and username found in the database, proceed to the 'BidX/ap1' page
            res.status(200).send({ message: 'Phone number and username validation successful' });
        } else {
            // Phone number or username not found in the database, return an error
            res.status(400).send({ message: 'Phone number or username not found' });
        }
        
        // Close the database connection
        conn.close();
    } catch (error) {
        console.error('Error validating phone number and username:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});


app.post('/home/dashboardp', async function(req, res){
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