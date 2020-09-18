const express = require('express');
const router = express.Router();
const db = require('../db');

const { users } = require('../models')
const passport = require('passport');

router.post('/signup', (req, res, next) => {
  const { uid, password, price } = req.body;
  db.query(`SELECT * FROM users WHERE uid = ?`, uid, (err, user) => {
    if(user[0] == undefined){
      const data = { uid: uid, password: password, price: price }
      db.query(`INSERT INTO users SET ?;`, data, (err, result) => {
        if(err) console.log(err);
        res.status(201).json({})
      })
    } else {
      res.status(200).json({})
    }
  })
})

router.post('/signin', passport.authenticate('local', {
  successRedirect: '/api/v1.0/users/signin/success',
  failureRedirect: '/api/v1.0/users/signin/fail'
}));

router.get('/signin/success', (req, res) => {
  res.status(200).json({})
})

router.get('/signin/fail', (req, res) => {
  res.status(204).json({})
})

router.get('/session-check', (req, res) => {
  res.status(200).json(req.user)
})

module.exports = router ;