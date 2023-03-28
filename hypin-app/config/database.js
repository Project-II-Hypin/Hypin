const mongoose = require('mongoose');
const { options } = require('../routes');

mongoose.connect(process.env.DATABASE_URL)
    .catch(err=>console.log(err));


const db = mongoose.connection;

db.on('connected', function() {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`)
});