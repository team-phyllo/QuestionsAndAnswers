const Faker = require('faker');

function randoNum(userContext, events, done) {

var ranNum = Faker.random.number({min: 1, max:1000});

userContext.vars.productId = ranNum;

return done();

}

module.exports = {
  randoNum
}
