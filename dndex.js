const PORT = process.env.PORT || 4000;
const express = require("express")
const app = express();
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const path = require("path")
const cors = require("cors")

app.use(express.json());
app.use(cors());

// Database Connection Mongose
async function connectToDatabase() {
    try {
        await mongoose.connect("mongodb+srv://schaingokul:gokul%40123@cluster0.mxevwy7.mongodb.net/e-commerce")
        console.log(`MongoDB is Connected`)
        } catch (error) {
      console.error(`MongoDB connection error: ${error}`);
    }
  }
  
  // Call back func to run to connect db
  connectToDatabase()

    // API creation
    app.get("/", (req, res) => {
      res.send("Express App is Running");
    });

    // Image Storage Engine
    const storage = multer.diskStorage({
        destination: './upload/images',
        filename:(req,file,cb)=>{
            return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
        }
    })
    
    const upload = multer({storage: storage}) 

    app.use('/images', express.static('upload/images'))
    // Creating Upload images
    app.post("/upload", upload.single('product'),(req,res)=>{
        res.json({
            success:1,
            image_url:`http://localhost:${PORT}/images/${req.file.filename}`
        })
    })
    // Schema for Creating Products
    const Product = mongoose.model('product',
    {
        id:{
            type: Number,
            required:true,
        },
        name:{
            type: String,
            required: true,
        },
        img:{
            type: String,
            required: true,
        },
        category:{
            type:String,
            required: true,
        },
        new_price:{
            type:Number,
            required: true,
        },
        old_price:{
            type: Number,
            required: true,
        },
        date:{
            type:Date,
            default: Date.now,
        },
        available:{
            type:Boolean,
            default:true,
        }
    })

    app.post('/addproduct', async (req, res) => {
        try {
            let products = await Product.find({})
            let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
            const product = new Product({
                id:id,
                name: req.body.name,
                img: req.body.img,
                category: req.body.category,
                new_price: req.body.new_price,
                old_price: req.body.old_price,
            });
            console.log(product);
            await product.save();
            console.log("Product saved successfully");
            res.status(201).json({
                success: true,
                name: req.body.name,
            });
        } catch (error) {
            console.error(`Error adding product: ${error}`);
        }
    });

    // Creating API for Deleting Products

    app.post('/removeproduct', async (req,res)=>{
        await Product.findOneAndDelete({id:req.body.id})
        console.log("Removed")
        res.json({
            success: true,
            name: req.body.name
        })
    })

    // Creating API for getting all products
    
    app.get('/allproducts',async (req, res) => {
        try {
            let products = await Product.find({});
            products.length > 0
                ? (console.log(`All Products: ${products}`), res.status(200).json(products))
                : (console.log("No products found"), res.json({ message: "No products found" }));
        } catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    // Connecting to PORT

    app.listen(PORT,(error)=>{
        !error ? console.log(`Server Runing on ${PORT}`) : console.log(`Server Error ${error}`) 
    })