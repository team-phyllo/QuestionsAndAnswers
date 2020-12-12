var Answer = require('../models/answerList.js')

exports.index = function (req, res) {
  var questId = req.params.question_id
  var limit = req.params.count || 5;
  Answer.get(questId, limit, (err, answer) => {
    if(err) {
      res.status(404).json({
        status:'error',
        message: err,
      })
    }
    res.json(answer[0])
  })
};

exports.new = function (req, res) {
  var newAnswer = new Answer({
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