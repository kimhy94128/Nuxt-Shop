const express = require('express');
const router = express.Router();
const file = require('../utils/fileUpload');
const db = require('../db');
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

  const sql = `SELECT * FROM clothes LIMIT ? OFFSET ?;`
  db.query(sql, [limit, page * limit], (err, result) => {
    res.json({
      totalCount: result.length,
      cloth: result,
      limit: limit,
      currentPage: page
    })
  })
})

// 회원정보
router.get('/users', (req, res) => {
  let page = req.query.page || 0
  let limit = 5

  const sql = `SELECT * FROM users LIMIT ? OFFSET ?;`
  db.query(sql, [limit, page * limit], (err, result) => {
    res.json({
      totalCount: result.length,
      user: result,
      limit: limit,
      currentPage: page
    })
  })
})

// 구매정보
router.get('/purchase', (req, res) => {
  let page = req.query.page || 0
  let limit = 5
  
  const join = ' INNER JOIN users ON purchases.userId = users.id  INNER JOIN clothes ON purchases.clotheId = clothes.id'
  const sql = `SELECT * FROM purchases ${join} LIMIT ? OFFSET ?;`
  db.query(sql, [limit, page * limit], (err, result) => {
    res.json({
      totalCount: result.length,
      purchase: result,
      limit: limit,
      currentPage: page
    })
  })
})

module.exports = router ;