'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._deleteInventory = exports.saveInventory = exports._createInventory = exports.findInventoriesByUserId = exports.findInventoryById = undefined;

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _databaseAdapter = require('./databaseAdapter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var findInventoriesByUserId = void 0;

var findInventoryById = void 0;

var _createInventory = void 0;

var saveInventory = void 0;

var _deleteInventory = void 0;

if (process.env.NODE_ENV === 'dev') {

  var makeInventoryItem = function makeInventoryItem() {
    return {
      id: _faker2.default.random.uuid(),
      inventoryId: "1",
      object: JSON.stringify({
        name: _faker2.default.random.word()
      }),
      quantityUnit: "lbs",
      currentQuantity: _faker2.default.random.number(),
      reorderQuantity: _faker2.default.random.number(),
      reorderThreshold: _faker2.default.random.number(),
      costUnit: "USD",
      unitCost: _faker2.default.random.number(),
      reorderCost: _faker2.default.random.number(),
      lastReorderDate: _faker2.default.date.past(),
      deliveryDate: _faker2.default.date.future(),
      createdAt: _faker2.default.date.past(),
      updatedAt: _faker2.default.date.past()
    };
  };

  var fakeItems = [];
  while (fakeItems.length < 200) {
    fakeItems.push(makeInventoryItem());
  }

  exports.findInventoriesByUserId = findInventoriesByUserId = function findInventoriesByUserId() {
    return [{
      id: "1",
      userId: "1",
      name: "test inventory",
      items: fakeItems
    }, {
      id: "2",
      userId: "1",
      name: "Malt",
      items: fakeItems
    }, {
      id: "3",
      userId: "1",
      name: "Hops",
      items: fakeItems
    }, {
      id: "4",
      userId: "1",
      name: "Yeast",
      items: fakeItems
    }];
  };

  exports.findInventoryById = findInventoryById = function findInventoryById(id) {
    return {
      id: id,
      userId: "1",
      name: _faker2.default.random.word(),
      items: fakeItems
    };
  };

  exports._createInventory = _createInventory = function _createInventory() {};

  exports.saveInventory = saveInventory = function saveInventory() {};

  exports._deleteInventory = _deleteInventory = function _deleteInventory() {};
} else {
  exports.findInventoriesByUserId = findInventoriesByUserId = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userId) {
      var inventories;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _databaseAdapter.find)('inventories', { userId: userId });

            case 2:
              inventories = _context.sent;
              return _context.abrupt('return', inventories);

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function findInventoriesByUserId(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  exports.findInventoryById = findInventoryById = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
      var inventory;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _databaseAdapter.findOne)('inventories', { id: id });

            case 2:
              inventory = _context2.sent;
              return _context2.abrupt('return', inventory);

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function findInventoryById(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  exports._createInventory = _createInventory = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(inventory) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              (0, _databaseAdapter.insertOne)("inventories", inventory);

            case 1:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function _createInventory(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  exports.saveInventory = saveInventory = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(inventory) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              (0, _databaseAdapter.updateOne)("inventories", { id: inventory.id }, inventory);

            case 1:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function saveInventory(_x4) {
      return _ref4.apply(this, arguments);
    };
  }();

  exports._deleteInventory = _deleteInventory = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              (0, _databaseAdapter.deleteOne)("inventories", id);

            case 1:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function _deleteInventory(_x5) {
      return _ref5.apply(this, arguments);
    };
  }();
}

exports.findInventoryById = findInventoryById;
exports.findInventoriesByUserId = findInventoriesByUserId;
exports._createInventory = _createInventory;
exports.saveInventory = saveInventory;
exports._deleteInventory = _deleteInventory;
//# sourceMappingURL=inventoryAdapter.js.map