const express = require('express');
const router = express.Router();

const { clothes } = require('../models');

router.get('/', (req, res) => {
  let page = req.query.page || 0
  let category = req.query.category
  let limit = 3

  if(category){
    category = {category: category}
  } else { category = {}}

  clothes.findAndCountAll({
    raw: true,
    limit: limit,
    offset: page * limit,
    where: category
  }).then((result) => {
    res.json({
      totalCount: result.count,
      cloth: result.rows,
      limit: limit,
      currentPage: page
    })
  })
})

module.exports = router ;