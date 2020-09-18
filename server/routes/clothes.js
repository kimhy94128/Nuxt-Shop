const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  let page = req.query.page || 0
  let category = req.query.category
  let limit = 3

  if(category){
    category = `where category = '${category}'`
  } else { category = ''; }

  const sql = `SELECT * FROM clothes ${category} LIMIT ? OFFSET ?;`
  db.query(sql, [limit, page * limit], (err, result) => {
    res.json({
      totalCount: result.length,
      cloth: result,
      limit: limit,
      currentPage: page
    })
  })
})

router.get('/detail', (req, res) => {
  let id = req.query.clothId
  const sql = `SELECT * FROM clothes WHERE id = ?;`

  db.query(sql, [id], (err, result) => {
    res.json(result[0])
  })
})

module.exports = router ;