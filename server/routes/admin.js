const express = require('express');
const router = express.Router();

const { clothes } = require('../models');

router.get('/', (req, res) => {
  res.send('hello');
})

router.post('/clothes/registry', (req, res) => {
  let {name, price, category, img} = req.body;

  clothes.create({
    name: name, price: price, category: category, img: img
  }).then((result) => {
    res.status(201).json({message: 'success'})
  })
})

module.exports = router ;