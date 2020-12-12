var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema({
  question_id:{
    type: Number,
    required: true
  },
  answer_id: {
    type: Number,
    required: true
  },
  answer_body: {type:String},
  data:{type:Date},
  answerer_name: {type: String},
  email:{type: String},
  helpfulness: {type:Number},
  reported: {type:Number}
},

{ collection: 'answerList' },);

var Answers = module.exports = mongoose.model('answerList', answerSchema);

module.exports.get = function(questId, limit, callback) {
  var answerAgg = [{$match: {
    question_id: Number(questId)
  }},{$limit: Number(limit)}, {$lookup: {
    from: 'photos',
    localField: 'answer_id',
    foreignField: 'photo_id',
    as: 'photos'
  }}, {$group: {
    _id: "$question_id",
    results: {$push: {
           answer_id: "$answer_id",
           body: "$answer_body",
           date: "$date",
           answerer_name: "$answerer_name",
           helpfulness: "$helpfulness",
           reported: "$reported",
           photos:"$photos"
         }}
  }}, {$set: {
    page: 0,
    count: Number(limit),
  }}, {$project: {
    _id:0,
    question:"$_id",
    page:"$page",
    count:"$count",
    results: "$results"


      }}];
  Answers.aggregate(answerAgg, callback)
}