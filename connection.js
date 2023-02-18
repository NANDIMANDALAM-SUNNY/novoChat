const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb+srv://sunny:sunny@cluster0.ck6j4.mongodb.net/chatapp?retryWrites=true&w=majority`, ()=> {
  console.log('connected to mongodb')
})
