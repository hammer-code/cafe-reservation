var express = require('express');
var database = require('./database');

var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

// Routing

/**
 * Lihat daftar produk
 */
app.get('/', function (req, res) {
  database.Cafe.findAll()
    .then(function (cafes) {
      res.render('cafe-list', { cafes: cafes });
    })
    .catch(function (error) {
      res.send(error);
    });
});

/**
 * Lihat halaman buat produk
 */
app.get('/cafes/create', function (req, res) {
  res.render('cafe-create');
});

/**
 * Lihat detail produk
 */
app.get('/cafes/:id', function (req, res) {
  database.Cafe.findById(req.params.id)
    .then(function (cafe) {
      if (!cafe) {
        res.render('not-found');

        return;
      }

      res.render('cafe-detail', { cafe: cafe });
    })
    .catch(function (error) {
      res.send(error);
    });
});

module.exports = app;