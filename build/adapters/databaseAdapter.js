"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteOneByObject = exports.deleteOne = exports.updateOne = exports.insertOne = exports.find = exports.findOne = exports.dbConnection = undefined;

var _mongodb = require("mongodb");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var url = process.env.DB_URL;
var db = void 0;

var dbConnection = exports.dbConnection = function dbConnection(cb) {
  _mongodb.MongoClient.connect(url).then(function (client) {
    console.log("Connected to database!");
    db = client.db("brewing-app-db");
    cb();
  }).catch(function (e) {
    return e;
  });
};

var findOne = exports.findOne = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(collectionName, searchObj) {
    var collection, doc;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            collection = db.collection(collectionName);
            _context.next = 3;
            return collection.findOne(searchObj);

          case 3:
            doc = _context.sent;
            return _context.abrupt("return", doc);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function findOne(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var find = exports.find = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(collectionName, searchObj) {
    var collection, docs;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            collection = db.collection(collectionName);
            _context2.next = 3;
            return collection.find(searchObj).toArray();

          case 3:
            docs = _context2.sent;
            return _context2.abrupt("return", docs);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function find(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var insertOne = exports.insertOne = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(collectionName, doc) {
    var collection;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            collection = db.collection(collectionName);

            collection.insertOne(doc, function (err, r) {
              if (err) {
                throw new Error('insertOne failed!');
              }

              console.log(r.insertedCount);
            });

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function insertOne(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var updateOne = exports.updateOne = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(collectionName, filter, updateObj) {
    var collection;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            collection = db.collection(collectionName);

            collection.updateOne(filter, { $set: updateObj }, function (err, r) {
              if (err) {
                throw new Error("updateOne failed!");
              }

              console.log(r.insertedCount);
            });

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function updateOne(_x7, _x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

var deleteOne = exports.deleteOne = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(collectionName, id) {
    var collection;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            collection = db.collection(collectionName);

            collection.deleteOne({ id: id }, function (err, r) {
              if (err) {
                throw new Error("deleteOne failed!");
              }

              console.log(r);
            });

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function deleteOne(_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();

var deleteOneByObject = exports.deleteOneByObject = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(collectionName, object) {
    var collection;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            collection = db.collection(collectionName);

            collection.deleteOne(object, function (err, r) {
              if (err) {
                throw new Error("deleteOneByObject failed!");
              }

              console.log(r.deletedCount);
            });

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function deleteOneByObject(_x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}();
//# sourceMappingURL=databaseAdapter.js.map