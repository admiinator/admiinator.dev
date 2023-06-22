var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(404);
});

router.get('/:modelID', (req, res, next) => {
  
})

module.exports = router;
