'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._deleteTimerAlert = exports.saveTimerAlert = exports._createTimerAlert = exports.findTimerAlertsByTimerId = exports.findTimerAlertById = undefined;

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _databaseAdapter = require('./databaseAdapter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var findTimerAlertById = void 0;
var findTimerAlertsByTimerId = void 0;
var _createTimerAlert = void 0;
var saveTimerAlert = void 0;
var _deleteTimerAlert = void 0;

if (process.env.NODE_ENV === 'dev') {

  var makeTimerAlert = function makeTimerAlert() {
    return {
      id: _faker2.default.random.uuid(),
      timerId: "1",
      activationTime: _faker2.default.random.number(),
      message: _faker2.default.random.word(),
      activated: false
    };
  };

  var fakeTimerAlerts = [];
  while (fakeTimerAlerts.length < 50) {
    fakeTimerAlerts.push(makeTimerAlert());
  }

  exports.findTimerAlertsByTimerId = findTimerAlertsByTimerId = function findTimerAlertsByTimerId() {
    return fakeTimerAlerts;
  };

  exports._createTimerAlert = _createTimerAlert = function _createTimerAlert() {};

  exports.findTimerAlertById = findTimerAlertById = function findTimerAlertById() {
    return makeTimerAlert();
  };

  exports.saveTimerAlert = saveTimerAlert = function saveTimerAlert() {};

  exports._deleteTimerAlert = _deleteTimerAlert = function _deleteTimerAlert() {};
} else {
  exports.findTimerAlertsByTimerId = findTimerAlertsByTimerId = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(timerId) {
      var timerAlerts;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              timerAlerts = (0, _databaseAdapter.find)('timerAlerts', { timerId: timerId });
              return _context.abrupt('return', timerAlerts);

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function findTimerAlertsByTimerId(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  exports._createTimerAlert = _createTimerAlert = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(timerAlert) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              (0, _databaseAdapter.insertOne)("timerAlerts", timerAlert);

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function _createTimerAlert(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  exports.findTimerAlertById = findTimerAlertById = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
      var timerAlert;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              timerAlert = (0, _databaseAdapter.findOne)('timerAlerts', { id: id });
              return _context3.abrupt('return', timerAlert);

            case 2:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function findTimerAlertById(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  exports.saveTimerAlert = saveTimerAlert = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(timerAlert) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              (0, _databaseAdapter.updateOne)("timerAlerts", { id: timerAlert.id }, timerAlert);

            case 1:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function saveTimerAlert(_x4) {
      return _ref4.apply(this, arguments);
    };
  }();

  exports._deleteTimerAlert = _deleteTimerAlert = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              (0, _databaseAdapter.deleteOne)("timerAlerts", id);

            case 1:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function _deleteTimerAlert(_x5) {
      return _ref5.apply(this, arguments);
    };
  }();
}

exports.findTimerAlertById = findTimerAlertById;
exports.findTimerAlertsByTimerId = findTimerAlertsByTimerId;
exports._createTimerAlert = _createTimerAlert;
exports.saveTimerAlert = saveTimerAlert;
exports._deleteTimerAlert = _deleteTimerAlert;
//# sourceMappingURL=timerAlertsAdapter.js.map