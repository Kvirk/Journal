const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');
const compiler = webpack(config);

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/journal";

app.use(bodyParser.json());

MongoClient.connect(MONGODB_URI, (err, db) => {
  let index = 1;

  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  db.collection("entrys").find().sort({id: -1}).toArray((err, entrys) => {
    if (err) {
      return console.log(err);
    }
    if(entrys[0]){
      index = entrys[0].id + 1;
    }
  });

  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  app.use(express.static('public'));
  app.use(webpackDevMiddleware(compiler, {
    publicPath: '/build'
  }));

  app.get('/journals', (req, res) =>{
    db.collection("entrys").find().sort({sentiment: -1}).toArray((err, entrys) => {
      if (err) {
        return console.log(err);
      }
      console.log(entrys);
      res.json(entrys);
    });
  });

  app.get('/journals/:id', (req, res) => {
    db.collection("entrys").findOne({id: Number(req.params.id)}, (err, entry) => {
      if (err) {
        res.sendStatus(404);
        return console.log(err);
      }
      res.json(entry)
    });
  });

  app.post('/journals', (req, res) => {
    if(req.body){
      let entry = req.body;
      entry.id = index++;
      entry.sentiment = entry.entry.split(/\s+/g).length * Number(entry.rating);
      db.collection("entrys").insertOne(entry, (err, entrys) => {
        if (err) {
          console.log(err);
        }
        console.log('inserted')
      });
      res.sendStatus(200);
    } else{
      res.sendStatus(400);
    }
  })
  app.listen(3000);

});