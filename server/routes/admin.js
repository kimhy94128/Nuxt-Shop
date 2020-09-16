const express = require('express');
const router = express.Router();
const file = require('../utils/fileUpload');

const { clothes, users, purchase } = require('../models');

router.get('/', (req, res) => {
  res.send('hello');
})

// 상품등록
router.post('/clothes/registry', file.single('img'), (req, res) => {
  let {name, price, category, img} = req.body;

  clothes.create({
    name: name, price: price, category: category, img: img
  }).then((result) => {
    res.status(201).json({message: 'success'})
  })
})

// 상품 가져오기
router.get('/clothes', (req, res) => {
  let page = req.query.page || 0
  let limit = 5

  clothes.findAndCountAll({
    raw: true,
    limit: limit,
    offset: page * limit
  }).then((result) => {
    res.json({
      totalCount: result.count,
      cloth: result.rows,
      limit: limit,
      currentPage: page
    })
  })
})

// 회원정보
router.get('/users', (req, res) => {
  let page = req.query.page || 0
  let limit = 5

  users.findAndCountAll({
    raw: true,
    limit: limit,
    offset: page * limit
  }).then((result) => {
    res.json({
      totalCount: result.count,
      user: result.rows,
      limit: limit,
      currentPage: page
    })
  })
})

// 구매정보
router.get('/purchase', (req, res) => {
  let page = req.query.page || 0
  let limit = 5

  purchase.findAndCountAll({
    raw: true,
    limit: limit,
    offset: page * limit,
    include: [
      {model: clothes},
      {model: users},
    ]
  }).then((result) => {
    res.json({
      totalCount: result.count,
      purchase: result.rows,
      limit: limit,
      currentPage: page
    })
  })
})

module.exports = router ;