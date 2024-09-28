const express = require('express');
const cors = require('cors');
const {MongoClient, ServerApiVersion, Binary} = require('mongodb');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
require('dotenv').config();


const path = require('path');
const fs = require('fs');


const app = express();  
app.use(express.json());
app.use(cors());
app.use(fileupload({
    limits: { fileSize: 100 * 1024 * 1024 } // Increase to 100 MB
}));
// Middleware configurations
app.use(bodyParser.json({ limit: '100mb' })); // Increase to 100 MB
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true })); // Increase to 100 MB

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on the port number ${PORT}`));

//Configuration (MONGODB)
var curl = `${process.env.REACT_APP_DB_URI}`;
var client = new MongoClient(curl, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

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
app.post('/login/signin', async function(req, res) {
    try {
        // Connect to MongoDB
        const conn = await client.connect();
        const db = conn.db('BidX');
        const users = db.collection('users');
        
        // Find the user matching username and password
        const user = await users.findOne({
            username: req.body.username,
            pwd: req.body.pwd // 'pwd' matches the frontend data
        });
        // Close the connection
        conn.close();
        
        // Check if user exists
        if (user) {
            res.json({ success: true, user: user }); // Send success and user data
        } else {
            res.json({ success: false, message: "Invalid Credentials" }); // Invalid login
        }
    } catch (err) {
        // Handle any errors
        res.status(500).json({ success: false, message: "Server error", error: err });
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



app.post('/uploaddp', async (req, res) => {
    if (!req.files || !req.files.myfile) {
        return res.status(400).send("No files were uploaded.");
    }

    const file = req.files.myfile;
    const base64Image = file.data.toString('base64'); // Convert to base64
    const fileName = req.body.fname; // Assuming this is the username or similar identifier

    try {
        await client.connect();
        const db = client.db('BidX');
        const collection = db.collection('users');

        // Update user with the base64 image data
        await collection.updateOne(
            { username: fileName },
            { $set: { imgurl: base64Image } },
            { upsert: true }
        );

        res.json({ message: "File uploaded successfully..." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error uploading file" });
    } finally {
        await client.close();
    }
});


app.post('/getImage', async (req, res) => {
    const username = req.body.username; // Use the username or identifier

    try {
        await client.connect();
        const db = client.db('BidX');
        const collection = db.collection('users');
        const user = await collection.findOne({ username: username });

        if (!user || !user.imgurl) {
            return res.status(404).send("Image not found");
        }

        res.json({ image: user.imgurl }); // Send the base64 string
    } catch (err) {
        res.status(500).send("Error retrieving image");
    } finally {
        await client.close();
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
        console.error(err);
        res.json(err).status(404);
    }
});

app.post('/uploadBid', async function (req, res) {
    try {
        if (!req.files) {
            return res.json("File not found");
        }

        let myfile = req.files.myfile;
        let fname = req.body.fname;
        let pname = req.body.pname;

        if (myfile.size > 100 * 1024 * 1024) { // Check if file size exceeds 100 MB
            return res.status(400).send('File size exceeds limit.');
        }
        // Convert the file to a buffer (blob)
        const fileBlob = new Binary(myfile.data);

        conn = await client.connect();
        db = conn.db('BidX');
        bids = db.collection('bids');

        // Update the bid document with the image blob
        await bids.updateOne(
            { Pproduct: pname },
            { $set: { Pimgurl: fileBlob } }
        );

        conn.close();
        res.json("File uploaded and stored successfully as a blob.");
    } catch (err) {
        res.status(404).json(err);
    }
});

app.post('/getBidImage', async function (req, res) {
    try {
        conn = await client.connect();
        db = conn.db('BidX');
        bids = db.collection('bids');

        const bid = await bids.findOne({ Pproduct: req.body.pname });

        conn.close();

        if (bid && bid.Pimgurl) {
            // Convert the binary data to a base64 string
            const base64Image = bid.Pimgurl.toString('base64');
            res.json({ image: base64Image });
        } else {
            res.status(404).json("Image not found.");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

app.post('/home/productWithUserImage', async function(req, res) {
    const { productUsername } = req.body;

    try {
        const conn = await client.connect();
        const db = conn.db('BidX');
        
        // Fetch bid data by username
        const bid = await db.collection('bids').findOne({ username: productUsername });

        if (!bid) {
            return res.status(404).json({ message: "Bid not found" });
        }

        // Fetch user image from users collection
        const user = await db.collection('users').findOne({ username: productUsername });

        if (!user || !user.imgurl) {
            return res.status(404).json({ message: "User image not found" });
        }

        // Send back the bid data and user profile image
        res.json({
            product: bid,
            userProfileImage: user.imgurl // This is base64 encoded
        });

        conn.close();
    } catch (err) {
        res.status(500).json({ error: "Server error", details: err });
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