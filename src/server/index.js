import express from 'express';
import bodyParser from 'body-parser';

// Tie routes to controllers
import index from './controller/index';
import api from './controller/api';

require('./model/database');

let app = express();
let PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// serve static content
// app.use(express.static(process.cwd() + '/view/public'));

app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/public');

app.use('/api', api);

// routes for all requests
app.use('*', index);

app.listen(PORT);

console.log('Listening on', PORT);