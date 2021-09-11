const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const connect = require('./schemas');

const app = express();
app.set('port', process.env.PORT || 3002);
app.use(cors());
connect();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   const error = new Error(`${req.method} ${req.url} the router not found`);
//   error.status = 404;
//   next(error);
// })

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.status(err.status || 500);
  res.render('error');
  console.log(next);
})

app.use('/api', require('./routes'));
app.use('/api/auth', require('./routes/auth'));

app.listen(app.get('port'), () => {
  console.log(`listening at ${app.get('port')}`);
})
