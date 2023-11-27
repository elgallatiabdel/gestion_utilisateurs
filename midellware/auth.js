const express = require('express');
const RegisterModel = require('../models/RegisterModel');
const bcrypt = require('bcrypt');

const auth = async (req, res, next) => {
  try {
    const existe_user = await RegisterModel.findOne({ email: req.body.email });

    if (existe_user) {
      const verification_password = await bcrypt.compare(req.body.password, existe_user.password);
      if (verification_password) {
        req.session.user = existe_user;
        next();
      } else {
        res.render('login', { message_err: 'le mot de passe est incorrect' });
      }
    } else {
      res.render('login', { message_err: 'l\'email est incorrect' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = auth;