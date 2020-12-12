var Questions = require('../models/questionList.js')

exports.index = function (req, res) {
  var prodId = req.params.product_id;
  var count = req.params.count || 5;
  // var page = req.params.page || 1;
  Questions.get(prodId, count, (err, questions) => {
    if(err) {
      res.json({
        status:'error',
        message: err,
      })
    }
    res.json(questions[0])
  })
};

exports.new = function (req, res) {
  var newQuestion = new Questions({
        product_id : req.body.product_id
      })
      newQuestion.save(function (err) {
        if (err) {
        res.json('error posting your request')
        } else {
        res.json({
          message:'new product added',
          data: newQuestion,
        })
        }
      })
}