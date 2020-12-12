var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Answer = require('../models/answerList.js')


var questionSchema = new Schema({
  product_id:{
    type: Number,
    required: true
  },
  question_id: {
    type: Number,
    required: true
  },
  question_body: {type:String},
  data:{type:Date},
  askers_name: {type: String},
  email:{type: String},
  helpfulness: {type:Number},
  reported: {type:Number}
},

{ collection: 'questionList' },

);

var Questions = module.exports = mongoose.model('questionList', questionSchema);



module.exports.get = function(prodId, count, callback) {
  //const product = prodId
    const agg = [{$set: {
      product_id:"$product_id"
    }}, {$match:  {product_id: Number(prodId)}
    }, {$limit: Number(count)}, {$group: {
       _id: "$product_id",
       results: {$push: {
         question_id: "$question_id",
         question_body: "$question_body",
         date: "$date",
         askwers_name: "$askers_name",
         question_helpfulness: "$helpfulness",
         reported: "$reported",
       }}

      }}, {$project: {
      _id:0,
      product_id: "$_id",
      results: "$results"
    }}];
  Questions.aggregate(agg, callback);
}


// [{$set: {
//   product_id:"$product_id"
// }}, {$match:  {product_id: 1}
// }, {$group: {
//    _id: "$product_id",
//    results: {$push: {
//      question_id: "$question_id",
//      question_body: "$question_body",
//      date: "$date",
//      askwers_name: "$askers_name",
//      email: "$email",
//      helpfulness: "$helpfulness",
//      reported: "$reported",
//    }}

//   }}]

  // {
  //   '$match': {
  //     'product_id': Number(prodId)
  //   }
  // },{
  //   '$lookup': {
  //     'from': Answer.collection.name,
  //     'localField': 'question_id',
  //     'foreignField': 'question_id',
  //     'as': 'answers'
  //   }
  // },