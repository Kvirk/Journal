const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');
const compiler = webpack(config);

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
let index = 1;
let journals = [
  {name: 'First Entry', completed: false, id: 0}
];
app.use(express.static('public'));
app.use(webpackDevMiddleware(compiler, {
  publicPath: '/build'
}));

app.get('/journals', (req, res) =>{
  res.json(journals);
});

app.get('/journals/:id', (req, res) => {
  const journal = journals.find(journalFinder(req.params.id));
  if(journal){
    res.json(journal);
  } else {
    res.sendStatus(404);
  }
});

app.post('/journals', (req, res) => {
  if(req.body){
    req.body.id = ++index;
    journals.push(req.body);
    res.json(req.body);
  } else{
    res.sendStatus(400);
  }
})

app.put('/journals/:id', (req, res) =>{
  const found = journals.find(journalFinder(req.params.id));
  if(found){
    found.completed = true;
    res.json(found);
  } else {
    res.sendStatus(404);
  }
})

function journalFinder(id){
  return function(journal){
    return journal.id.toString() == id.toString();
  }
}
app.listen(3000);