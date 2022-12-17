const express = require('express')

const {apiRouter} = require('./api/api.router')
const {PORT} = require('./configs/app.const')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

app.listen(PORT, () => console.log(`SERVER STARTED ON ${PORT} PORT`));
