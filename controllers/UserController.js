const User = require('../models/UserModel')

// function get
const home_get_users = (req, res) => {
  User
    .find()
    .then((result)=>{ 
      res.render('home', {users : result, user_session: req.session.user} );
    })
    .catch(err => console.log(err));
}

const add_get_user = (req, res) => {
  res.render('add', {user_session: req.session.user});
}

const view_get_user = (req, res) => {
  User
    .findById(req.params.id)
    .then((result)=>{ 
      res.render('view', {user : result, user_session: req.session.user} );
    })
    .catch(err => console.log(err));
}

const edit_get_user = (req, res) => {
  User
    .findById(req.params.id)
    .then((result)=>{ 
      res.render('edit', {user : result, user_session: req.session.user} );
    })
    .catch(err => console.log(err));
}

// function post
const add_post_user = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(()=>{ 
      User
        .find()
        .then((result)=>{ 
          res.render('home', {users : result, user_session: req.session.user} );
        })
        .catch(err => console.log(err));
      })
    .catch(err => console.log(err));
}

// function put
const edit_put_user = (req, res) => {
  User
    .updateOne({_id: req.params.id}, req.body)
    .then((result)=>{ 
      console.log(result);
      User
        .find()
        .then((result)=>{ 
          res.render('home', {users : result, user_session: req.session.user} );
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

// function delete
const delete_post_user = (req, res) => {
  User
    .deleteOne({_id: req.params.id})
    .then((result)=>{ 
      console.log(result);
      User
        .find()
        .then((result)=>{ 
          res.render('home', {users : result, user_session: req.session.user} );
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

module.exports = {home_get_users,add_get_user,view_get_user,edit_get_user,add_post_user, edit_put_user, delete_post_user}