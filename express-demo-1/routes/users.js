var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('user')
})
router.get('/xxx', function (req, res, next) {
  res.send('user xxx')
})

module.exports = router
