const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const {CustomError} = require('./errors/CustomError');
const {apiRouter} = require('./api/api.router');
const {PORT, MONGO_URL} = require('./configs/app.const');

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);
app.use('*', notFoundGlobalError);
app.use(mainErrorHandler);

app.listen(PORT,() => {
    console.log(`SERVER STARTED ON ${PORT} PORT`);
});


function notFoundGlobalError(req, res, next) {
    next(new CustomError('Page Not Found', 404));
}

function mainErrorHandler(err, req, res, next){
    res
        .status(err.status || 500)
        .json({
            message: err.message || 'Unknown error',
            status: err.status || 500
        });
}