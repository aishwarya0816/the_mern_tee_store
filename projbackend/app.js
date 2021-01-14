require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//my routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

//DATABASE=mongodb://localhost:27017/tshirt
//DATABASE=mongodb+srv://killer:SF4Smk9jfU6MiTy7@cluster0.biqtp.mongodb.net/<dbname>?retryWrites=true&w=majority/tshirt
//SF4Smk9jfU6MiTy7
//killer
// DB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true 
}).then(() => {
    console.log("DB CONNECTED");
})

// Middlewares  
app.use(bodyParser.json());
app.use(cookieParser()) ;
app.use(cors()); 

// My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);


// Ports
const port = process.env.PORT || 8000; 

// Starting a server
app.listen(port, ()=>{
    console.log(`App is running at ${port}`)
});





/* 
app.use((req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id ;
    if(!checker){
        return res.status(403).json({
            error : "access denied"
        })
    }
    next();
})
*/
