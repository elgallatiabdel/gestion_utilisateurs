const User = require('../models/UserModel')
const moment = require('moment');

// function get
const home_get_users = async (req, res) => {
  try {
    let users;
    if (req.session.user) {
      users = await User.find({ user_id: req.session.user._id });
    }

    res.render('home', { users, user_session: req.session.user, moment });
  } catch (err) {
    console.error(err);
    res.render('dashboard');
  }
}

const add_get_user = (req, res) => {
  res.render('add', {user_session: req.session.user , moment: moment});
}

const view_get_user = async (req, res) => {
  
  User
    .findById(req.params.id)
    .then(async (result)=>{ 
      res.render('view', {user : result, user_session: req.session.user , moment: moment} );
    })
    .catch(err => console.log(err));
}

const edit_get_user = async (req, res) => {
  User
    .findById(req.params.id)
    .then(async (result)=>{ 
      res.render('edit', {user : result, user_session: req.session.user , moment: moment} );
    })
    .catch(err => console.log(err));
}


const add_post_user = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    let users;
    if (req.session.user) {
      users = await User.find({ user_id: req.session.user._id });
    }

    res.render('home', { users, user_session: req.session.user, moment });
  } catch (err) {
    console.error(err);
    res.render('home', { error: 'Une erreur s\'est produite en récupérant les utilisateurs' });
  }
};

// function put
const edit_put_user =async (req, res) => {
    try {
      await User.updateOne({_id: req.params.id}, req.body);
  
      let users;
      if (req.session.user) {
        users = await User.find({ user_id: req.session.user._id });
      }
  
      res.render('home', { users, user_session: req.session.user, moment });
    } catch (err) {
      console.error(err);
      res.render('home', { error: 'Une erreur s\'est produite en récupérant les utilisateurs' });
    }
}

// function delete
const delete_post_user = async (req, res) => {
  try {
    await User.deleteOne({_id: req.params.id});

    let users;
    if (req.session.user) {
      users = await User.find({ user_id: req.session.user._id });
    }

    res.render('home', { users, user_session: req.session.user, moment });
  } catch (err) {
    console.error(err);
    res.render('home', { error: 'Une erreur s\'est produite en récupérant les utilisateurs' });
  }
}

module.exports = {home_get_users,add_get_user,view_get_user,edit_get_user,add_post_user, edit_put_user, delete_post_user}