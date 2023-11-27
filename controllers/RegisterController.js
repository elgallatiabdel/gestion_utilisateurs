const RegisterModel = require('../models/RegisterModel')
const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt');

// fonctions get
const get_register = (req,res) => {
  res.render('register');
}

const get_login = (req,res) => {
  res.render('login');
}

const get_logout = (req,res) => {
  req.session.destroy();
  UserModel
    .find()
    .then((result) => {
      res.render('home', {users: result});
    })

}

// fonction post
const post_register = async (req,res) => {
  try {
    const existe_user = await RegisterModel.findOne({ email: req.body.email})
    if(existe_user) {
      res.render('register', {message_err: 'L\'utilisateur existe dèja'});
    }else {
      if(req.body.password === req.body.confirm_password) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const User = new RegisterModel({...req.body,password: hashedPassword});
        await User.save();
        res.render("login");
      }else {
        res.render('register', {message_err: 'Mot de passe incorrect'});
      }
    }
  } catch (err) {
    console.log(err);
  }
  
}

const post_login = (req,res) => {
  UserModel
    .find()
    .then((result) => {
      res.render('home', {users: result, user_session: req.session.user});
  })
}



module.exports = {get_register,get_login,post_register,post_login,get_logout}