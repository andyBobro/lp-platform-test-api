const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const morgan = require('morgan');
const chalk = require('chalk');
const routes = require("./routes/index.js");
const db = require('./db/index.js');
const root = require('./utils/root.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(morgan(function(tokens, req, res) {
	return [
		'\n',
		chalk.hex('#ff4757').bold('🍄  FAKE API --> '),
		chalk.hex('#34ace0').bold(tokens.method(req, res)),
		chalk.hex('#ffb142').bold(tokens.status(req, res)),
		chalk.hex('#ff5252').bold(tokens.url(req, res)),
		chalk.hex('#2ed573').bold(tokens['response-time'](req, res) + ' ms'),
		chalk.hex('#f78fb3').bold('@ ' + tokens.date(req, res)),
		chalk.yellow(tokens['remote-addr'](req, res)),
		chalk.hex('#fffa65').bold('from ' + tokens.referrer(req, res)),
		chalk.hex('#1e90ff')(tokens['user-agent'](req, res)),
	].join(' ');
}));

app.use(cors())

app.use(express.static(root + '/assets'));

app.get('/', function(req, res) {
	res.sendFile(root + '/index.html');
});

app.get('/remotes', function(req, res) {
	res.sendFile(root + '/remoteAPI/index.html');
});

app.get('/formatter', function(req, res) {
	res.sendFile(root + '/formatter/index.html');
});

routes(app, db)

const server = app.listen(9000, function() {
	console.log(`Welcome to fake api running on ${server.address().port}`);
});
