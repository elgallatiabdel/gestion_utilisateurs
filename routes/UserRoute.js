const express = require('express');
const UserRoute = express.Router();
const UserController = require('../controllers/UserController');

// routes for getting
UserRoute.get('/',UserController.home_get_users);
UserRoute.get('/add',UserController.add_get_user);
UserRoute.get('/view/:id',UserController.view_get_user);
UserRoute.get('/edit/:id',UserController.edit_get_user);

// routes for posting 
UserRoute.post('/add',UserController.add_post_user);

// routes for putting
UserRoute.put('/edit/:id',UserController.edit_put_user);

// routes for deleting
UserRoute.delete('/delete/:id',UserController.delete_post_user);

module.exports = UserRoute;