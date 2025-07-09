const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const { request } = require("http");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
mongoose.connect("mongodb+srv://rohitbagde535:1OAJCLN5wcJqfu2Q@cluster0.mkeduwz.mongodb.net/");
// mongoose.connect("mongodb+srv://rohitbagde535:1OAJCLN5wcJqfu2Q@cluster0.mkeduwz.mongodb.net/muscleblaze?retryWrites=true&w=majority&appName=Cluster0");
mongoose.connection.on('connected', () => console.log('MongoDB connected ✅'));
mongoose.connection.on('error', err => console.error('MongoDB connection error ❌', err));

//API Creation

app.get("/",(req, res)=>{
    res.send("Express App is Running")
})

const storage = multer.diskStorage({
    destination: 'upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

const upload = multer({ storage: storage });

app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single("product"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    const imageUrl = `http://localhost:${port}/images/${req.file.filename}`;
    res.json({ 
        success:1,
        image_url: imageUrl });
});

const Product = mongoose.model("product", {
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:false,
    },
    // category:{
    //     type:String,
    //     required:true,
    // },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    Date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true
    },
})

app.post("/add-product", async (req, res) => {
    try {

        let products = await Product.find({});
        let id;
        if (products.length > 0) {
            let last_product_array = products.slice(-1);
            let last_product = last_product_array[0];
            id = last_product.id + 1;
        } else {
            id = 1;
        }

        const { name, image, description, new_price, old_price } = req.body;
        const newProduct = new Product({
            id,
            name,
            image,
            description,
            new_price,
            old_price
        });
        await newProduct.save();
        console.log(newProduct);
        console.log(Product);
        res.json({ success: 1, name: newProduct.name, message: "Product added successfully" });
    } catch (error) {
        res.status(500).json({ success: 0, message: "Error adding product", error: error.message });
    }
});

app.post('/remove-product', async (req, res) => {
    try {
        const { id, name } = req.body;
        const product = await Product.findOneAndDelete({ id: id });
        console.log(product);
        if (!product) {         
            return res.status(404).json({ success: 0, message: "Product not found" });
        }
        res.json({ success: 1, name: name, message: "Product removed successfully" });
    } catch (error) {
        res.status(500).json({ success: 0, message: "Error removing product", error: error.message });
    }
});

app.get("/all-products", async (req, res) => {
    try {
        const products = await Product.find({});
        if (products.length === 0) {
            return res.status(404).json({ success: 0, message: "No products found" });
        }
        res.send(products);
    } catch (error) {
        res.status(500).json({ success: 0, message: "Error fetching products", error: error.message });
    }
})

const Users = mongoose.model('Users', {
    
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    // cartData: {
    //     type: Object,
    //     required: true,
    // },
    date: {
        type: Date,
        default: Date.now,
    },
})

app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const check = await Users.findOne({ email });
        if (check) {
            return res.status(400).json({ success: 0, message: "User already exists" });
        }
        
        let cart = {};
        for(let i = 0; i < 300; i++){
            cart[i] = 0;
        }

        const newUser = new Users({ name, email, password, cartData: cart });
        await newUser.save();

        const data = {
            user: {
                id: newUser.id,
            }
        }

        const token = jwt.sign(data, "secret_ecom");

        res.json({ success: 1, token, message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ success: 0, message: "Error registering user", error: error.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: 0, message: "User not found" });
        }
        if (user.password !== password) {
            return res.status(400).json({ success: 0, message: "Invalid password" });
        }
        const data = {
            user: {
                id: user.id,
            }
        }
        const token = jwt.sign(data, "secret_ecom");
        res.json({ success: 1, token, message: "User logged in successfully" });
    } catch (error) {
        res.status(500).json({ success: 0, message: "Error logging in user", error: error.message });
    }
});

//new collection data
app.get('/new-collection', async (req, res) => {
    try {
        let products = await Product.find({});
        let newCollection = products.slice(1).slice(-8);
        if (newCollection.length === 0) {
            return res.status(404).json({ success: 0, message: "No products found" });
        }
        console.log("New Collection Fetched");
        res.send(newCollection);
    } catch (error) {
        res.status(500).json({ success: 0, message: "Error fetching products", error: error.message });
    }
});

// app.get('/popular-protein', async (req, res) => {
//     try {
//         let products = await Product.find({ category: "Protein" });
//         let popular_protein = products.slice(0,4);
//         console.log("Popular in Protein Fetched");
//         res.send(popular_protein);
//     } catch (error) {
//         res.status(500).json({ success: 0, message: "Error fetching products", error: error.message });
//     }
// });

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ success: 0, message: "No token provided" });
    }
    try {
        const verified = jwt.verify(token, "secret_ecom");
        req.user = verified.user;
        next();
    } catch (error) {
        res.status(401).json({ success: 0, message: "Invalid token", error: error.message });
    }
}

app.post('/add-to-cart', fetchUser, async (req, res) => {
    try {
        const { itemId } = req.body;
        const user = await Users.findOne({ _id: req.user.id });
        if (!user) {
            return res.status(404).json({ success: 0, message: "User not found" });
        }
        user.cartData[itemId] += 1;
        await Users.findOneAndUpdate({ _id: req.user.id },{ cartData: user.cartData });
        res.send({ success: 1, message: "Product added to cart successfully" });
    } catch (error) {
        res.status(500).json({ success: 0, message: "Error adding product to cart", error: error.message });
    }
});

app.post('/remove-from-cart', fetchUser, async (req, res) => {
    try {
        const { itemId } = req.body;
        const user = await Users.findOne({ _id: req.user.id });
        if (!user) {
            return res.status(404).json({ success: 0, message: "User not found" });
        }
        if (user.cartData[itemId] <= 0) {
            return res.status(400).json({ success: 0, message: "No items to remove from cart" });
        }
        user.cartData[itemId] -= 1;
        await Users.findOneAndUpdate({ _id: req.user.id },{ cartData: user.cartData });
        res.send({ success: 1, message: "Product removed from cart successfully" });
    } catch (error) {
        res.status(500).json({ success: 0, message: "Error removing product from cart", error: error.message });
    }
});

app.post('/get-cart', fetchUser, async (req, res) => {
    try {
        const user = await Users.findOne({ _id: req.user.id });
        if (!user) {
            return res.status(404).json({ success: 0, message: "User not found" });
        }
        res.json(user.cartData);
    } catch (error) {
        res.status(500).json({ success: 0, message: "Error fetching cart data", error: error.message });
    }
});

const Contacts = mongoose.model('Contacts', {

    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

app.post('/contact', async (req, res) => {
    try {
        const { name, email, number } = req.body;
        const newContact = new Contacts({ name, email, number });
        await newContact.save();
        res.status(201).json({ success: 1, message: "Contact added successfully" });
    } catch (error) {
        res.status(500).json({ success: 0, message: "Error adding contact", error: error.message });
    }
});

app.listen(port,(e)=>{
    if(!e){
        console.log("Server Running on Port "+ port)
    }
    else{
        console.log("Error : "+ e)
    }
})