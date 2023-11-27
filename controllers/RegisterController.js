const RegisterModel = require('../models/RegisterModel')
const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt');
const moment = require('moment');

// fonctions get
const get_register = (req,res) => {
  res.render('register');
}

const get_login = (req,res) => {
  res.render('login');
}

const get_logout = (req,res) => {
  req.session.destroy();
  res.render('dashboard');
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

const post_login = async (req,res) => {
  try {
    let users;
    if (req.session.user) {
      // Si un utilisateur est connecté, récupérez uniquement ses propres utilisateurs
      users = await UserModel.find({ user_id: req.session.user._id });
      res.render('home', { users, user_session: req.session.user, moment });
    } else {
      res.render('home', {  user_session: req.session.user, moment });
    }

    res.render('home', { users, user_session: req.session.user, moment });
  } catch (err) {
    console.error(err);
    res.render('home', { error: 'Une erreur s\'est produite en récupérant les utilisateurs' });
  }
}



module.exports = {get_register,get_login,post_register,post_login,get_logout}