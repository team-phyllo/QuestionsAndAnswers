//run node csvEtlMongo.js to begin etl process

const fs = require("fs");
const mongodb = require("mongodb").MongoClient;
const fastcsv = require("fast-csv");

var myDb = require('./config.js')

//change csv path for different csv files
//var csvPath = '/Users/jonathangarcia/Desktop/testData/answers_photos.csv';
var fsStream = fs.createReadStream(csvPath);
var etlData = [];
var csvStream = fastcsv
  .parse()
  //change 'etlData' structure and field names based on differnt csv
  .on('data', function(data){
    etlData.push({
        photo_id: Number(data[0]),
        answer_id: Number(data[1]),
        url: data[2],
        //fields for questions and answers

        // date: data[3],
        // answerer_name: data[4],
        // email: data[5],
        // helpfulness: Number(data[7]),
        // reported: Number(data[6]),
    })

  })
  .on("end", function(){
    etlData.shift();

    mongodb.connect(
      myDb.dbLocation,
      { useNewUrlParser: true , useUnifiedTopology: true},
      (err, dbClient) => {
        if (err) throw err;
        dbClient
        //change db and collection names for differnt csv
        .db("QuestionAnswers")
        .collection("photos")
        .insertMany(etlData, (err, res) => {
          if (err) throw err;
          dbClient.close()
        })
      }
      )
  })
  fsStream.pipe(csvStream);
