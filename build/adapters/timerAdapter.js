'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._deleteTimer = exports.saveTimer = exports._createTimer = exports.timerExists = exports.findStartedTimers = exports.findTimersByUserId = exports.findTimerById = undefined;

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _databaseAdapter = require('./databaseAdapter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var findTimerById = void 0;
var findTimersByUserId = void 0;
var timerExists = void 0;
var _createTimer = void 0;
var saveTimer = void 0;
var _deleteTimer = void 0;
var findStartedTimers = void 0;

if (process.env.NODE_ENV === 'dev') {

  var makeTimer = function makeTimer() {
    return {
      id: _faker2.default.random.uuid(),
      userId: "1",
      name: _faker2.default.random.word(),
      duration: _faker2.default.random.number(),
      remainingDuration: _faker2.default.random.number(),
      intervalDuration: _faker2.default.random.number(),
      isRunning: false
    };
  };

  var fakeTimers = [];
  while (fakeTimers.length < 50) {
    fakeTimers.push(makeTimer());
  }

  exports.findTimersByUserId = findTimersByUserId = function findTimersByUserId() {
    return fakeTimers;
  };

  exports.findTimerById = findTimerById = function findTimerById(id) {
    var timer = makeTimer();
    return Object.assign({}, timer, { id: id });
  };

  exports.timerExists = timerExists = function timerExists() {
    return true;
  };

  exports._createTimer = _createTimer = function _createTimer() {};

  exports.saveTimer = saveTimer = function saveTimer() {};

  exports._deleteTimer = _deleteTimer = function _deleteTimer() {};
} else {
  exports.findTimersByUserId = findTimersByUserId = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userId) {
      var timers;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _databaseAdapter.find)('timers', { userId: userId });

            case 2:
              timers = _context.sent;
              return _context.abrupt('return', timers);

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function findTimersByUserId(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  exports.findTimerById = findTimerById = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
      var timer;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              timer = (0, _databaseAdapter.findOne)('timers', { id: id });
              return _context2.abrupt('return', timer);

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function findTimerById(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  exports.findStartedTimers = findStartedTimers = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var timers;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _databaseAdapter.find)("timers", { isRunning: true });

            case 2:
              timers = _context3.sent;
              return _context3.abrupt('return', timers);

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function findStartedTimers() {
      return _ref3.apply(this, arguments);
    };
  }();

  exports._createTimer = _createTimer = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(timer) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              (0, _databaseAdapter.insertOne)("timers", timer);

            case 1:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function _createTimer(_x3) {
      return _ref4.apply(this, arguments);
    };
  }();

  exports.saveTimer = saveTimer = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(timer) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              (0, _databaseAdapter.updateOne)("timers", { id: timer.id }, timer);

            case 1:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function saveTimer(_x4) {
      return _ref5.apply(this, arguments);
    };
  }();

  exports._deleteTimer = _deleteTimer = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              (0, _databaseAdapter.deleteOne)("timers", id);

            case 1:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    }));

    return function _deleteTimer(_x5) {
      return _ref6.apply(this, arguments);
    };
  }();
}

exports.findTimerById = findTimerById;
exports.findTimersByUserId = findTimersByUserId;
exports.findStartedTimers = findStartedTimers;
exports.timerExists = timerExists;
exports._createTimer = _createTimer;
exports.saveTimer = saveTimer;
exports._deleteTimer = _deleteTimer;
//# sourceMappingURL=timerAdapter.js.map