require('module-alias/register');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const usersRouter = require('./routes/user');
const productRouter = require("./routes/product");
const depositRouter = require("./routes/deposit");
const productMovementRouter = require("./routes/product-movement");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', usersRouter);
app.use("/product", productRouter);
app.use("/deposit", depositRouter);
app.use("/product-movement", productMovementRouter);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
