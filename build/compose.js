'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decrementTimers = exports.deleteInventoryItem = exports.updateInventoryItem = exports.createInventoryItem = exports.getInventoryItem = exports.getTimerAlertsByTimerId = exports.deleteTimerAlert = exports.deactivateTimerAlert = exports.activateTimerAlert = exports.updateTimerAlert = exports.createTimerAlert = exports.getTimerAlert = exports.getInventory = exports.getInventoriesByUserId = exports.deleteInventory = exports.updateInventory = exports.createInventory = exports.getTimersByUserId = exports.deleteTimer = exports.updateTimer = exports.resetTimer = exports.decrementTimer = exports.stopTimer = exports.startTimer = exports.createTimer = exports.getTimer = exports.deleteUser = exports.authenticateUser = exports.updateUser = exports.createUser = exports.getUser = exports.hashPassword = undefined;

var _brewingAppLogic = require('brewing-app-logic');

var core = _interopRequireWildcard(_brewingAppLogic);

var _userAdapter = require('./adapters/userAdapter');

var _timerAdapter = require('./adapters/timerAdapter');

var _inventoryAdapter = require('./adapters/inventoryAdapter');

var _inventoryItemAdapter = require('./adapters/inventoryItemAdapter');

var _timerAlertsAdapter = require('./adapters/timerAlertsAdapter');

var _messagingAdapter = require('./adapters/messagingAdapter');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.hashPassword = _userAdapter.hashPassword;

//User

var getUser = exports.getUser = core.getUserUseCase(_userAdapter.findUserById);
var createUser = exports.createUser = core.createUserUseCase(_userAdapter.isUsernameUnique)(_userAdapter.isEmailUnique)(_userAdapter._createUser)(_userAdapter.hashPassword);
var updateUser = exports.updateUser = core.updateUserUseCase(_userAdapter.findUserById)(_userAdapter.isUsernameUnique)(_userAdapter.isEmailUnique)(_userAdapter.saveUser);
var authenticateUser = exports.authenticateUser = core.authenticateUserUseCase(_userAdapter.findUserByUsername)(_userAdapter.compareHash);
var deleteUser = exports.deleteUser = core.deleteUserUseCase(_userAdapter._deleteUser);

//Timer
var getTimer = exports.getTimer = core.getTimerUseCase(_timerAdapter.findTimerById);
var createTimer = exports.createTimer = core.createTimerUseCase(_timerAdapter._createTimer);
var startTimer = exports.startTimer = core.startTimerUseCase(_timerAdapter.findTimerById)(_timerAdapter.saveTimer);
var stopTimer = exports.stopTimer = core.stopTimerUseCase(_timerAdapter.findTimerById)(_timerAdapter.saveTimer);
var decrementTimer = exports.decrementTimer = core.decrementTimerUseCase(_timerAdapter.findTimerById)(_timerAdapter.saveTimer);
var resetTimer = exports.resetTimer = core.resetTimerUseCase(_timerAdapter.findTimerById)(_timerAdapter.saveTimer);
var updateTimer = exports.updateTimer = core.updateTimerUseCase(_timerAdapter.findTimerById)(_timerAdapter.saveTimer);
var deleteTimer = exports.deleteTimer = core.deleteTimerUseCase(_timerAdapter._deleteTimer);
var getTimersByUserId = exports.getTimersByUserId = core.getTimersByUserIdUseCase(_userAdapter.userExists)(_timerAdapter.findTimersByUserId);

//Inventory
var createInventory = exports.createInventory = core.createInventoryUseCase(_inventoryAdapter._createInventory);
var updateInventory = exports.updateInventory = core.updateInventoryUseCase(_inventoryAdapter.findInventoryById)(_inventoryAdapter.saveInventory);
var deleteInventory = exports.deleteInventory = core.deleteInventoryUseCase(_inventoryAdapter._deleteInventory);
var getInventoriesByUserId = exports.getInventoriesByUserId = core.getInventoriesByUserIdUseCase(_userAdapter.userExists)(_inventoryAdapter.findInventoriesByUserId);
var getInventory = exports.getInventory = core.getInventoryUseCase(_inventoryAdapter.findInventoryById);

//Timer Alert
var getTimerAlert = exports.getTimerAlert = core.getTimerAlertUseCase(_timerAlertsAdapter.findTimerAlertById);
var createTimerAlert = exports.createTimerAlert = core.createTimerAlertUseCase(_timerAlertsAdapter._createTimerAlert);
var updateTimerAlert = exports.updateTimerAlert = core.updateTimerAlertUseCase(_timerAlertsAdapter.findTimerAlertById)(_timerAlertsAdapter.saveTimerAlert);
var activateTimerAlert = exports.activateTimerAlert = core.activateTimerAlertUseCase(_timerAlertsAdapter.findTimerAlertById)(_timerAlertsAdapter.saveTimerAlert)(_messagingAdapter.sendMessage);
var deactivateTimerAlert = exports.deactivateTimerAlert = core.deactivateTimerAlertUseCase(_timerAlertsAdapter.findTimerAlertById)(_timerAlertsAdapter.saveTimerAlert);
var deleteTimerAlert = exports.deleteTimerAlert = core.deleteTimerAlertUseCase(_timerAlertsAdapter._deleteTimerAlert);
var getTimerAlertsByTimerId = exports.getTimerAlertsByTimerId = core.getTimerAlertsByTimerIdUseCase(_timerAlertsAdapter.findTimerAlertsByTimerId);

//Inventory Item
var getInventoryItem = exports.getInventoryItem = core.getInventoryItemUseCase(_inventoryItemAdapter.findInventoryItemById);
var createInventoryItem = exports.createInventoryItem = core.createInventoryItemUseCase(_inventoryItemAdapter._createInventoryItem)(_inventoryItemAdapter.addToInventory);
var updateInventoryItem = exports.updateInventoryItem = core.updateInventoryItemUseCase(_inventoryItemAdapter.findInventoryItemById)(_inventoryItemAdapter.saveInventoryItem);
var deleteInventoryItem = exports.deleteInventoryItem = core.deleteInventoryItemUseCase(_inventoryItemAdapter._deleteInventoryItem);

var decrementTimers = exports.decrementTimers = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var startedTimers, promises, decrementedTimers;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _timerAdapter.findStartedTimers)().catch(function (e) {
              return e;
            });

          case 2:
            startedTimers = _context2.sent;
            promises = startedTimers.map(function (timer) {
              return decrementTimer(timer.id, Date.now());
            });
            _context2.next = 6;
            return Promise.all(promises);

          case 6:
            decrementedTimers = _context2.sent;

            decrementedTimers.forEach(function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(timer) {
                var timerAlerts, timerAlertsToActivate;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _timerAlertsAdapter.findTimerAlertsByTimerId)(timer.id);

                      case 2:
                        timerAlerts = _context.sent;
                        timerAlertsToActivate = timerAlerts.filter(function (alert) {
                          return alert.activationTime === timer.remainingDuration;
                        });

                        timerAlertsToActivate.forEach(function (alert) {
                          return activateTimerAlert(alert.id).catch(function (e) {
                            return console.error(e);
                          });
                        });

                      case 5:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function decrementTimers() {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=compose.js.map