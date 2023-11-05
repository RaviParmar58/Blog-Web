const express = require('express');
const { mongoose } = require('mongoose');
const app = express();
const bodyParser = require('body-parser')
const appRouter = require('./Router/appRouter')
require('dotenv').config();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const UserModel = require('./Model/signupModel');

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(bodyParser.json(), bodyParser.urlencoded());

app.use('/images', express.static(__dirname + '/images'));

mongoose.connect(process.env.DB_URL).then(() => console.log('DB is connected') ).catch(err => console.log(err));

app.use('', appRouter);

app.listen(process.env.PORT, () => console.log(process.env.PORT));