const express = require('express');
const http = require('http');
const fs = require('fs');
const session = require('express-session');
const passport = require('./utils/passport');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 인증
app.use(session({
  secret: '#123#123#asd#qwe#zxc#qwer#128*(*&asdjkwhereareyoufrom',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7}
}));

app.use(passport.initialize());
app.use(passport.session());

const routes = require('./routes')
const { Nuxt, Builder } = require('nuxt');
const config = require('../nuxt.config');
const { pass } = require('./utils/passport/local');
const nuxt = new Nuxt(config);
const builder = new Builder(nuxt);

builder.build();

app.get('/uploads/:filename', (req, res) => {
  let file = __dirname + '/uploads' + req.params.filename
  fs.readFile(file, (err, data) => {
    res.end(data);
  })
})

app.use('/api/v1.0', routes);
app.use(nuxt.render);

// 서버 실행
const port = 3000
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`server on ${port} port`);
})