'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteResetHash = exports.findHash = exports.saveResetHash = exports.hashToken = exports.generateResetToken = undefined;

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _databaseAdapter = require('./databaseAdapter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var generateResetToken = exports.generateResetToken = function generateResetToken() {
  return (0, _v2.default)();
};

var hashToken = exports.hashToken = function hashToken(token) {
  var salt = _bcrypt2.default.genSaltSync(10);
  var hash = _bcrypt2.default.hashSync(token, salt);
  return hash;
};

var saveResetHash = exports.saveResetHash = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(email, hash, url) {
    var doc;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //Expires in 2 hours
            doc = { email: email, hash: hash, callbackURL: url, expires: Date.now() + 2 * 60 * 60 * 1000 };

            (0, _databaseAdapter.insertOne)("resetTokens", doc).then(function () {
              console.log("saved!");
            }).catch(function (e) {
              return e;
            });

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function saveResetHash(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var findHash = exports.findHash = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(token) {
    var docs, doc;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _databaseAdapter.find)("resetTokens", {});

          case 2:
            docs = _context2.sent;
            doc = docs.find(function (doc) {
              return _bcrypt2.default.compareSync(token, doc.hash);
            });
            return _context2.abrupt('return', doc);

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function findHash(_x4) {
    return _ref2.apply(this, arguments);
  };
}();

var deleteResetHash = exports.deleteResetHash = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(token) {
    var docs, doc;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _databaseAdapter.find)("resetTokens", {});

          case 2:
            docs = _context3.sent;
            doc = docs.find(function (doc) {
              return _bcrypt2.default.compareSync(token, doc.hash);
            });
            _context3.next = 6;
            return (0, _databaseAdapter.deleteOneByObject)("resetTokens", doc).catch(function (e) {
              return e;
            });

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function deleteResetHash(_x5) {
    return _ref3.apply(this, arguments);
  };
}();
//# sourceMappingURL=tokenAdapter.js.map