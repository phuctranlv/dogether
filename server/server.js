const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Io = require('socket.io');

const { socialRouter, planRouter } = require('./router');

const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use('/social', socialRouter);
app.use('/plans', planRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
