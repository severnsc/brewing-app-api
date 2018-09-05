'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._deleteInventoryItem = exports.saveInventoryItem = exports.findInventoryItemById = exports.addToInventory = exports._createInventoryItem = undefined;

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _databaseAdapter = require('./databaseAdapter');

var _compose = require('../compose');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _createInventoryItem = void 0;
var addToInventory = void 0;
var findInventoryItemById = void 0;
var saveInventoryItem = void 0;
var _deleteInventoryItem = void 0;

if (process.env.NODE_ENV === 'dev') {
  exports._createInventoryItem = _createInventoryItem = function _createInventoryItem() {};

  exports.addToInventory = addToInventory = function addToInventory() {};

  exports.findInventoryItemById = findInventoryItemById = function findInventoryItemById(id) {
    return {
      id: id,
      inventoryId: "1",
      object: JSON.stringify({ name: _faker2.default.random.word() }),
      quantityUnit: "lbs",
      currentQuantity: _faker2.default.random.number(),
      reorderQuantity: _faker2.default.random.number(),
      reorderThreshold: _faker2.default.random.number(),
      costUnit: "USD",
      unitCost: _faker2.default.random.number(),
      reorderCost: _faker2.default.random.number(),
      lastReorderDate: _faker2.default.date.past().toUTCString(),
      deliveryDate: _faker2.default.date.future().toUTCString(),
      createdAt: _faker2.default.date.past().toUTCString(),
      updatedAt: _faker2.default.date.past().toUTCString()
    };
  };

  exports.saveInventoryItem = saveInventoryItem = function saveInventoryItem(inventoryItem) {
    return console.log(inventoryItem);
  };

  exports._deleteInventoryItem = _deleteInventoryItem = function _deleteInventoryItem() {};
} else {
  exports._createInventoryItem = _createInventoryItem = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(inventoryItem) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              (0, _databaseAdapter.insertOne)(inventoryItem);

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function _createInventoryItem(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  exports.addToInventory = addToInventory = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(inventoryItem) {
      var inventoryId, inventory;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              inventoryId = inventoryItem.inventoryId;
              _context2.next = 3;
              return (0, _compose.getInventory)(inventoryId);

            case 3:
              inventory = _context2.sent;
              _context2.next = 6;
              return (0, _compose.updateInventory)(inventoryId, { items: [].concat(_toConsumableArray(inventory.items), [inventoryItem]) });

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function addToInventory(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  exports.findInventoryItemById = findInventoryItemById = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
      var inventoryItem;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _databaseAdapter.find)('inventoryItems', { id: id });

            case 2:
              inventoryItem = _context3.sent;
              return _context3.abrupt('return', inventoryItem);

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function findInventoryItemById(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  exports.saveInventoryItem = saveInventoryItem = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(inventoryItem) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              (0, _databaseAdapter.updateOne)("inventoryItems", { id: inventoryItem.id }, inventoryItem);

            case 1:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function saveInventoryItem(_x4) {
      return _ref4.apply(this, arguments);
    };
  }();

  exports._deleteInventoryItem = _deleteInventoryItem = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              (0, _databaseAdapter.deleteOne)("inventoryItems", id);

            case 1:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function _deleteInventoryItem(_x5) {
      return _ref5.apply(this, arguments);
    };
  }();
}

exports._createInventoryItem = _createInventoryItem;
exports.addToInventory = addToInventory;
exports.findInventoryItemById = findInventoryItemById;
exports.saveInventoryItem = saveInventoryItem;
exports._deleteInventoryItem = _deleteInventoryItem;
//# sourceMappingURL=inventoryItemAdapter.js.map