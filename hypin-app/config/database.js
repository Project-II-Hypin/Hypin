const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);

mongoose.connect(/*DATABASE_URL,*/ { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
}, () => { 
    console.log('connected to database myDb ;)') 
})

const db = mongoose.connection;

db.on('connected', function() {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`)
});