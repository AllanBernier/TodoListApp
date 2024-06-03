const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = 3001 || 4500;

// app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});


app.use( require('./router/loginRouter'));
app.use( require('./router/tableauRouter'));


app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

const {ensureAuthorized} = require('./lib/auth')
app.get('/api',ensureAuthorized , (req, res) => {
  res.json({ message: 'Hello from auth route !' });
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});