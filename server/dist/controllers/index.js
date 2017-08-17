'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _books = require('./books');

var _books2 = _interopRequireDefault(_books);

var _userbooks = require('./userbooks');

var _userbooks2 = _interopRequireDefault(_userbooks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  User: _user2.default,
  Books: _books2.default,
  UserBooks: _userbooks2.default
};