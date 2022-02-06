const express = require('express');
const getRouter = require('./routes/routeGet');
const postRouter = require('./routes/routerPost');
const app = express();

app.use(express.static('JS'));
app.use(express.static('CSS'));
app.use(express.static('JQuery'));
app.use(express.static('img'));

app.get('/', getRouter);

app.get('/Register', getRouter);

app.get('/Doctor', getRouter);

app.get('/Show', getRouter);

app.post('/Submit', postRouter);

app.post('/Delete', postRouter);

app.post('/getData', postRouter);

app.post('/Edit', postRouter);

app.post('/Doctor/Check', postRouter);

app.listen(8080, () => console.log("Doctorology is now Connected in Localhost:8080"));

