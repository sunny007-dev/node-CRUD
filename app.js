const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const url = 'mongodb://localhost:27017/EmployeeDB';
const port = process.env.port || 3000;

const app = express();

mongoose.connect(url ,{useNewUrlParser: true});
const con = mongoose.connection;

con.on('open', function(){
    console.log('connected....');
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const authRouter = require('./routes/loginRoute');
app.use('/login', authRouter);

const empRouter = require('./routes/route');
app.use('/', empRouter);

app.listen(port, () => {
    console.log('server started');
} )