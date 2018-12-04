var mongoose = require('mongoose');

if (!process.env.MONGODB_URI){
  console.log('Error: MONGODB_URI NOT SET');
  process.exit(1);
}

var userSchema = {
  username: {
    type: String
  },
  password: {
    type: String
  },
  resume: {
    type: String
  }
}


var User = mongoose.model("User", userSchema);

module.exports = {
  User: User,
}
