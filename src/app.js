var express = require('express');
var bodyParser = require('body-parser');
var database = require('./database');

var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

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
 * Lihat halaman buat cafe
 */
app.get('/cafes/create', function (req, res) {
  res.render('cafe-create');
});

/**
 * Untuk memproses pembuatan cafe
 */
app.post('/cafes/create', function (req, res) {
  var name = req.body.name;
  var address = req.body.address;


  database.Cafe.create({
    name: name,
    address: address,
  }).then((user) => {
    res.redirect('/');
  });
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

/**
 * Lihat form edit
 */
app.get('/cafes/:id/edit', function (req, res) {
  database.Cafe.findById(req.params.id)
    .then(function (cafe) {
      if (!cafe) {
        res.render('not-found');

        return;
      }

      res.render('cafe-edit', { cafe: cafe });
    })
    .catch(function (error) {
      res.send(error);
    });
});

app.post('/cafes/:id/edit', function (req, res) {
  database.Cafe.findById(req.params.id)
    .then(function (cafe) {
      if (!cafe) {
        res.render('not-found');

        return;
      }

      var name = req.body.name;
      var address = req.body.address;

      return cafe.update({
        name: name,
        address: address,
      });
    })
    .then(function (updatedCafe) {
      res.redirect('/cafes/' + updatedCafe.id);
    })
    .catch(function (error) {
      res.send(error);
    });
});

app.delete('/cafes/:id', function (req, res) {
  database.Cafe.findById(req.params.id)
    .then(function (cafe) {
      if (!cafe) {
        res.json({
          message: 'Not found',
        });

        return;
      }

      return cafe.destroy();
    })
    .then(function () {
      res.json({ message: 'Data has been deleted' });;
    })
    .catch(function (error) {
      res.send(error);
    });
});

module.exports = app;