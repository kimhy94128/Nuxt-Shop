const express = require('express');
const router = express.Router();
const db = require('../db')

router.post('/', (req, res) => {
  if(!req.user){
    return res.status(200).json({ msg: '로그인 하지 않았습니다.'})
  }
  let uid = req.user.id;
  let {clothId, price} = req.body

  let leftPrice = 0

  db.query(`SELECT * FROM users WHERE id = ?`, [uid], (err, result) => {
    if(result[0].price >= price){
      leftPrice = result[0].price - price;
      db.query('INSERT INTO purchases SET ?', {userId: uid, clotheId: clothId}, (err, result2) => {
        if(err) console.log(err);
        db.query('UPDATE users SET price = ? WHERE id = ?', [leftPrice, uid], (err, result3) => {
          res.status(201).json({})
        })
      })
    } else {
      res.status(204).json({});
    }
  })
})

router.get('/', (req, res) => {
  let userId = req.user.id;
  let page = req.query.page || 0 ;
  let limit = 5;

  const join = 'INNER JOIN users ON purchases.userId = users.id  INNER JOIN clothes ON purchases.clotheId = clothes.id'
  const where = `userId = '${userId}'`
  const sql = `SELECT * FROM purchases ${join} ${where} LIMIT ? OFFSET ?;`
  db.query(sql, [limit, page * limit], (err, result) => {
    if(err) console.log(err);
    res.json({
      totalCount: result.length,
      purchase: result,
      limit: limit,
      currentPage: page
    })
  })
})

module.exports = router ;