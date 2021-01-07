const express = require("express");

const app = express();

const port = 8000;

app.get('/', (req, res) => {
    return res.send("Home Page");
}) ;

const admin = (req, res) => {
    return res.send("admin dashboard");
};

const isAdmin = (req, res, next) => {
    console.log("isAdmin is running");
    next();
};

const isLoggedIn = (req, res, next) => {
    console.log("isLoggedIn is running");
    next();
};

app.get('/admin', isLoggedIn, isAdmin, admin);


app.get('/login', (req, res) => {
    return res.send("You are visiting a login route");
}) ;

app.get('/signup', (req, res) => {
    return res.send("You are visiting a signup route");
}) ;

app.get('/signout', (req, res) => {
    return res.send("You are signed out");
}) ;

app.get('/hitesh', (req, res) => {
    return res.send("Hitesh's uers instagram");
}) ;

app.listen(port, () => {
    console.log("server is up and running...");
});

