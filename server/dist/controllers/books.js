'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _helper = require('../Helper/helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Books = _models2.default.Books;

exports.default = {
  create: function create(req, res) {
    if (_user2.default === null) {
      return res.json({ success: false, message: 'You need to be logged in.' });
    }
    return Books.create({
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      quantity: req.body.quantity,
      description: req.body.description
    }).then(function (books) {
      return res.json({
        Book_number: books.bookid,
        Book: books.title,
        Author: books.author,
        Description: books.description,
        Number: books.quantity
      });
    }).catch(function (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        res.json({
          error: 'Unique Error',
          message: 'The book with this author is already in the database try editing the book quantity'
        });
        //res.status(400).send(error);
      } else {
        res.status(400).send({
          Errors: _helper2.default.errorArray(error)
        });
      }
    });
  },

  // .updateAttributes(req.body, { fields: Object.keys(req.body) })
  update: function update(req, res) {
    return Books.findById(req.params.bookId).then(function (book) {
      if (req.params.bookId === null) {
        return res.json({ success: false, message: 'Enter a parameter' });
      }
      if (!book) {
        return res.status(404).send({
          message: 'Book does not exist in this database'
        });
      }
      return book.updateAttributes(req.body, { fields: Object.keys(req.body) }).then(function () {
        return res.status(201).send(book);
      } // Send back the updated book
      ).catch(function (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
          res.json({
            error: 'Unique Error',
            message: 'The book with this author is already in the database try editing the book quantity'
          });
          //res.status(400).send(error);
        } else {
          res.status(400).send({
            Errors: _helper2.default.errorArray(error)
          });
        }
      });
    }).catch(function (error) {
      return res.status(400).send({ Errors: _helper2.default.errorArray(error) });
    });
  },
  getAllBooks: function getAllBooks(req, res) {
    return Books.all().then(function (book) {
      if (book == '' || book == undefined || book == null) {
        res.json({
          error: 'Empty',
          message: 'There are no books present in the database'
        });
      } else {
        res.status(200).send({ book: book });
      }
    }).catch(function (error) {
      return res.status(400).send(error.message);
    });
  }
};