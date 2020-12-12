
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    status: 'API is working',
    message: 'Hello World',
  });
});

var questionController = require('../controllers/questionController.js')
/* Routes for questions. */
router.route('/questionList/:product_id/:count?')
  .get(questionController.index)
  .post(questionController.new);

var answerController = require('../controllers/answerController.js')
  /* Routes for questions. */
router.route('/answerList/:question_id/:count?')
  .get(answerController.index)
  .post(answerController.new);


module.exports = router;
