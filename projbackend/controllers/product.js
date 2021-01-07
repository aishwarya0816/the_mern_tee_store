const Product = require("../models/product") 
const formidable = require("formidable")
const _ = require("lodash") 
const fs = require("fs"); //file system 

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate("category")
    .exec((err, product) => {
        if(err){
            return res.status(400).json({
                error: "Product not found"
            })
        }
        req.product = product;
        next();
    })
}

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
         if(err){
             return res.status(400).json({
                 error: "Problem with image"
             });
         }

         const {name, description, price, category, stock} = fields;

         if(
            !name ||
            !description ||
            !price ||
            !category ||
            !stock
         ){
             return res.status(400).json({
                error: "Please include all fields "
             });

         }
         
         let product = new Product(fields)

         // handle file here
         if(file.photo){
            if(file.photo.size > 3000000){ // 1024*1024*2 = 2097152 -> 2 mb
                return res.status(400).json({
                    error: "file size too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
         }

         // save to the BD
         product.save((err, product) => {
             if(err){
                 res.status(400).json({
                     error: "saving tshirt in DB is failed"
                 })
             }
             res.json(product) 
         })
    });
};



