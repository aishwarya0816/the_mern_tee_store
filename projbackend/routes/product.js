const express = require("express")
const router = express.Router();

const {getProductById, createProduct} = require("../controllers/product")
const {getUserById} = require("../controllers/user");
const {isAdmin, isAuthenticated, isSignedIn} = require("../controllers/auth");

//all of params
router.param("userId", getUserById);
router.param("productId", getProductById);

//all of actual routes
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct)

module.exports = router;

