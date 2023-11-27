const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserRoute = require('./routes/UserRoute');
const RegisterRoute = require('./routes/RegisterRoute');
const url = "mongodb://127.0.0.1:27017/preparations";
const session = require("express-session");

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.static('public'))
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('node_modules/bootstrap/dist'));


app.use(
  session({
      secret: "my secrets",
      resave: false,
      saveUninitialized: true,
  })
);

app.use('/users',UserRoute);
app.use('/register',RegisterRoute);

app.get('/',(req, res) => {
  res.redirect('/users');
})

mongoose
  .connect(url)
  .then(()=>{ 
    console.log("Connected to Mongoose");
    app.listen(3000, ()=>{
      console.log('listening on port 3000');
    });
  })
  .catch(err => console.log(err));