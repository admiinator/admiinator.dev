var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('home')
});

router.get('/:modelID', (req, res, next) => {
  res.json({"modelID": req.params.modelID });
})

module.exports = router;
