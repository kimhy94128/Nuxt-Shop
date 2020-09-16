const express = require('express');
const http = require('http');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const routes = require('./routes')
const { Nuxt, Builder } = require('nuxt');
const config = require('../nuxt.config');
const nuxt = new Nuxt(config);
const builder = new Builder(nuxt);

builder.build();
app.use('/api/v1.0', routes);
app.use(nuxt.render);

const port = 3000
const server = http.createServer(app);

// const { users, clothes, purchase } = require('./models');

server.listen(port, () => {
  console.log(`server on ${port} port`);
})