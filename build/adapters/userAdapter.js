'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._deleteUser = exports.saveUser = exports.compareHash = exports.hashPassword = exports._createUser = exports.isEmailUnique = exports.isUsernameUnique = exports.userExists = exports.findUserByEmail = exports.findUserByUsername = exports.findUserById = undefined;

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _databaseAdapter = require('./databaseAdapter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var findUserById = void 0;
var findUserByUsername = void 0;
var findUserByEmail = void 0;
var userExists = void 0;
var isUsernameUnique = void 0;
var isEmailUnique = void 0;
var _createUser = void 0;
var hashPassword = void 0;
var compareHash = void 0;
var saveUser = void 0;
var _deleteUser = void 0;
var updateUserPassword = void 0;

if (process.env.NODE_ENV === 'dev') {

  var makeUser = function makeUser() {
    return {
      id: _faker2.default.random.uuid(),
      userName: _faker2.default.internet.userName(),
      hashedPassword: _faker2.default.internet.password(),
      email: _faker2.default.internet.email()
    };
  };

  exports.findUserById = findUserById = function findUserById(id) {
    return {
      id: id,
      userName: _faker2.default.internet.userName(),
      hashedPassword: _faker2.default.internet.password(),
      email: _faker2.default.internet.email()
    };
  };

  exports.findUserByUsername = findUserByUsername = function findUserByUsername(userName) {
    return {
      id: "1",
      userName: userName,
      hashedPassword: _faker2.default.internet.password(),
      email: _faker2.default.internet.email()
    };
  };

  exports.findUserByEmail = findUserByEmail = function findUserByEmail(email) {
    return {
      id: "1",
      userName: _faker2.default.internet.userName(),
      hashedPassword: _faker2.default.internet.password(),
      email: email
    };
  };

  exports.userExists = userExists = function userExists(id) {
    return true;
  };

  exports.isUsernameUnique = isUsernameUnique = function isUsernameUnique() {
    return Promise.resolve(true);
  };

  exports.isEmailUnique = isEmailUnique = function isEmailUnique() {
    return true;
  };

  exports._createUser = _createUser = function _createUser() {};

  exports.hashPassword = hashPassword = function hashPassword(word) {
    return word;
  };

  exports.compareHash = compareHash = function compareHash() {
    return true;
  };

  exports.saveUser = saveUser = function saveUser() {};

  exports._deleteUser = _deleteUser = function _deleteUser() {};
} else {
  exports.findUserById = findUserById = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
      var user;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _databaseAdapter.findOne)('users', { id: id });

            case 2:
              user = _context.sent;
              return _context.abrupt('return', user);

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function findUserById(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  exports.findUserByUsername = findUserByUsername = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(userName) {
      var user;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _databaseAdapter.findOne)('users', { userName: userName });

            case 2:
              user = _context2.sent;
              return _context2.abrupt('return', user);

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function findUserByUsername(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  exports.findUserByEmail = findUserByEmail = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(email) {
      var user;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _databaseAdapter.findOne)('users', { email: email });

            case 2:
              user = _context3.sent;
              return _context3.abrupt('return', user);

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function findUserByEmail(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  exports.userExists = userExists = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id) {
      var user;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return findUserById(id);

            case 2:
              user = _context4.sent;
              return _context4.abrupt('return', user ? true : false);

            case 4:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function userExists(_x4) {
      return _ref4.apply(this, arguments);
    };
  }();

  exports.isUsernameUnique = isUsernameUnique = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(username) {
      var user;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return (0, _databaseAdapter.findOne)('users', { userName: username }).catch(function (e) {
                return e;
              });

            case 2:
              user = _context5.sent;
              return _context5.abrupt('return', user ? false : true);

            case 4:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function isUsernameUnique(_x5) {
      return _ref5.apply(this, arguments);
    };
  }();

  exports.isEmailUnique = isEmailUnique = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(email) {
      var user;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return (0, _databaseAdapter.findOne)('users', { email: email }).catch(function (e) {
                return e;
              });

            case 2:
              user = _context6.sent;
              return _context6.abrupt('return', user ? false : true);

            case 4:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    }));

    return function isEmailUnique(_x6) {
      return _ref6.apply(this, arguments);
    };
  }();

  exports._createUser = _createUser = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(user) {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              (0, _databaseAdapter.insertOne)('users', user);

            case 1:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined);
    }));

    return function _createUser(_x7) {
      return _ref7.apply(this, arguments);
    };
  }();

  exports.hashPassword = hashPassword = function hashPassword(password) {
    var salt = _bcrypt2.default.genSaltSync(10);
    var hash = _bcrypt2.default.hashSync(password, salt);
    return hash;
  };

  exports.compareHash = compareHash = function compareHash(password, hash) {
    return _bcrypt2.default.compareSync(password, hash);
  };

  exports.saveUser = saveUser = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(user) {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              (0, _databaseAdapter.updateOne)("users", { id: user.id }, user);

            case 1:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined);
    }));

    return function saveUser(_x8) {
      return _ref8.apply(this, arguments);
    };
  }();

  exports._deleteUser = _deleteUser = function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(id) {
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              (0, _databaseAdapter.deleteOne)("users", id);

            case 1:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, undefined);
    }));

    return function _deleteUser(_x9) {
      return _ref9.apply(this, arguments);
    };
  }();
}

exports.findUserById = findUserById;
exports.findUserByUsername = findUserByUsername;
exports.findUserByEmail = findUserByEmail;
exports.userExists = userExists;
exports.isUsernameUnique = isUsernameUnique;
exports.isEmailUnique = isEmailUnique;
exports._createUser = _createUser;
exports.hashPassword = hashPassword;
exports.compareHash = compareHash;
exports.saveUser = saveUser;
exports._deleteUser = _deleteUser;
//# sourceMappingURL=userAdapter.js.map