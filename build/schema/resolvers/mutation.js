'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _compose = require('../../compose');

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
  createUser: function createUser(_, _ref) {
    var userName = _ref.userName,
        password = _ref.password,
        email = _ref.email;

    if (!_validator2.default.isEmail(email)) {
      throw new Error("Invalid email!");
    }

    var user = (0, _compose.createUser)(userName, password, email);
    return user;
  },

  updateUser: function updateUser(_, _ref2, ctx) {
    var id = _ref2.id,
        userName = _ref2.userName,
        password = _ref2.password,
        email = _ref2.email;

    if (ctx && ctx.user.id === id) {
      var updatePropsObj = {};

      if (userName) {
        updatePropsObj.userName = userName;
      }

      if (password) {
        var hashedPassword = (0, _compose.hashPassword)(password);
        updatePropsObj.hashedPassword = hashedPassword;
      }

      if (email) {
        if (!_validator2.default.isEmail(email)) {
          throw new Error();
        }
        updatePropsObj.email = email;
      }

      var updatedUser = (0, _compose.updateUser)(id, updatePropsObj);
      return updatedUser;
    } else {
      return null;
    }
  },

  authenticateUser: function authenticateUser(_, _ref3) {
    var userName = _ref3.userName,
        password = _ref3.password;

    var authenticatedUser = (0, _compose.authenticateUser)(userName, password);
    return authenticatedUser;
  },

  deleteUser: function deleteUser(_, _ref4, ctx) {
    var id = _ref4.id;

    if (ctx && ctx.user.id === id) {
      var deletedUser = (0, _compose.deleteUser)(id);
      return deletedUser;
    } else {
      return null;
    }
  },

  createInventory: function createInventory(_, _ref5, ctx) {
    var name = _ref5.name,
        userId = _ref5.userId;

    if (ctx && ctx.user.id === userId) {
      var inventory = (0, _compose.createInventory)(name, userId);
      return inventory;
    } else {
      return null;
    }
  },

  updateInventory: function updateInventory(_, _ref6, ctx) {
    var id = _ref6.id,
        name = _ref6.name;

    return (0, _compose.getInventory)(id).then(function (inventory) {
      if (ctx && ctx.user.id === inventory.userId) {
        var updatedInventory = (0, _compose.updateInventory)(id, { name: name });
        return updatedInventory;
      } else {
        return null;
      }
    }).catch(function (e) {
      return e;
    });
  },

  deleteInventory: function deleteInventory(_, _ref7, ctx) {
    var id = _ref7.id;

    return (0, _compose.getInventory)(id).then(function (inventory) {
      if (ctx && ctx.user.id === inventory.userId) {
        var deletedInventory = (0, _compose.deleteInventory)(id);
        return deletedInventory;
      } else {
        return null;
      }
    }).catch(function (e) {
      return e;
    });
  },

  createInventoryItem: function createInventoryItem(_, _ref8, ctx) {
    var inventoryId = _ref8.inventoryId,
        object = _ref8.object,
        quantityUnit = _ref8.quantityUnit,
        currentQuantity = _ref8.currentQuantity,
        reorderQuantity = _ref8.reorderQuantity,
        reorderThreshold = _ref8.reorderThreshold,
        costUnit = _ref8.costUnit,
        unitCost = _ref8.unitCost,
        reorderCost = _ref8.reorderCost,
        lastReorderDate = _ref8.lastReorderDate,
        deliveryDate = _ref8.deliveryDate,
        createdAt = _ref8.createdAt,
        updatedAt = _ref8.updatedAt;

    return (0, _compose.getInventory)(inventoryId).then(function (inventory) {
      if (ctx && ctx.user.id === inventory.userId) {
        var inventoryItem = (0, _compose.createInventoryItem)(inventoryId, object, quantityUnit, currentQuantity, reorderQuantity, reorderThreshold, costUnit, unitCost, reorderCost, lastReorderDate, deliveryDate, createdAt, updatedAt);
        return inventoryItem;
      } else {
        return null;
      }
    }).catch(function (e) {
      return e;
    });
  },

  updateInventoryItem: function updateInventoryItem(_, _ref9, ctx) {
    var id = _ref9.id,
        inventoryId = _ref9.inventoryId,
        object = _ref9.object,
        quantityUnit = _ref9.quantityUnit,
        currentQuantity = _ref9.currentQuantity,
        reorderQuantity = _ref9.reorderQuantity,
        reorderThreshold = _ref9.reorderThreshold,
        costUnit = _ref9.costUnit,
        unitCost = _ref9.unitCost,
        reorderCost = _ref9.reorderCost,
        lastReorderDate = _ref9.lastReorderDate,
        deliveryDate = _ref9.deliveryDate;

    return (0, _compose.getInventory)(inventoryId).then(function (inventory) {
      if (ctx && ctx.user.id === inventory.userId) {
        var updatePropsObj = {};

        var args = [{ inventoryId: inventoryId }, { object: object }, { quantityUnit: quantityUnit }, { currentQuantity: currentQuantity }, { reorderQuantity: reorderQuantity }, { reorderThreshold: reorderThreshold }, { costUnit: costUnit }, { unitCost: unitCost }, { reorderCost: reorderCost }, { lastReorderDate: lastReorderDate }, { deliveryDate: deliveryDate }];

        var argKeys = args.map(function (arg) {
          return Object.keys(arg)[0];
        });

        args.forEach(function (arg, index) {
          if (arg[argKeys[index]]) {
            updatePropsObj = Object.assign({}, updatePropsObj, arg);
          } else if (arg[argKeys[index]] === 0) {
            updatePropsObj = Object.assign({}, updatePropsObj, arg);
          } else if (['lastReorderDate', 'deliveryDate'].some(function (str) {
            return str === argKeys[index];
          })) {
            if (arg[argKeys[index]] === null) {
              updatePropsObj = Object.assign({}, updatePropsObj, arg);
            }
          }
        });

        var updatedInventoryItem = (0, _compose.updateInventoryItem)(id, updatePropsObj);
        return updatedInventoryItem;
      } else {
        return null;
      }
    }).catch(function (e) {
      return e;
    });
  },

  deleteInventoryItem: function deleteInventoryItem(_, _ref10, ctx) {
    var id = _ref10.id;

    return (0, _compose.getInventoryItem)(id).then(function (inventoryItem) {
      return (0, _compose.getInventory)(inventoryItem.inventoryId).then(function (inventory) {
        if (ctx && ctx.user.id === inventory.userId) {
          var deletedInventoryItem = (0, _compose.deleteInventoryItem)(id);
          return deletedInventoryItem;
        } else {
          return null;
        }
      }).catch(function (e) {
        return e;
      });
    }).catch(function (e) {
      return e;
    });
  },

  createTimer: function createTimer(_, _ref11, ctx) {
    var userId = _ref11.userId,
        name = _ref11.name,
        duration = _ref11.duration,
        intervalDuration = _ref11.intervalDuration;

    if (ctx && ctx.user.id === userId) {
      var timer = (0, _compose.createTimer)(userId, name, duration, intervalDuration);
      return timer;
    } else {
      return null;
    }
  },

  startTimer: function startTimer(_, _ref12, ctx) {
    var id = _ref12.id;

    return (0, _compose.getTimer)(id).then(function (timer) {
      if (ctx && ctx.user.id === timer.userId) {
        var startedTimer = (0, _compose.startTimer)(id);
        return startedTimer;
      } else {
        return null;
      }
    }).catch(function (e) {
      return e;
    });
  },

  stopTimer: function stopTimer(_, _ref13, ctx) {
    var id = _ref13.id;

    return (0, _compose.getTimer)(id).then(function (timer) {
      if (ctx && ctx.user.id === timer.userId) {
        var stoppedTimer = (0, _compose.stopTimer)(id);
        return stoppedTimer;
      } else {
        return null;
      }
    }).catch(function (e) {
      return e;
    });
  },

  decrementTimer: function decrementTimer(_, _ref14, ctx) {
    var id = _ref14.id;

    return (0, _compose.getTimer)(id).then(function (timer) {
      if (ctx && ctx.user.id === timer.userId) {
        var decrementedTimer = (0, _compose.decrementTimer)(id);
        return decrementedTimer;
      } else {
        return null;
      }
    }).catch(function (e) {
      return e;
    });
  },

  resetTimer: function resetTimer(_, _ref15, ctx) {
    var id = _ref15.id;

    return (0, _compose.getTimer)(id).then(function () {
      var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(timer) {
        var resetedTimer, alerts;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(ctx && ctx.user.id === timer.userId)) {
                  _context.next = 9;
                  break;
                }

                resetedTimer = (0, _compose.resetTimer)(id);
                _context.next = 4;
                return (0, _compose.getTimerAlertsByTimerId)(id);

              case 4:
                alerts = _context.sent;

                alerts.forEach(function (alert) {
                  return (0, _compose.deactivateTimerAlert)(alert.id);
                });
                return _context.abrupt('return', resetedTimer);

              case 9:
                return _context.abrupt('return', null);

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function (_x) {
        return _ref16.apply(this, arguments);
      };
    }()).catch(function (e) {
      return e;
    });
  },

  updateTimer: function updateTimer(_, _ref17, ctx) {
    var id = _ref17.id,
        name = _ref17.name,
        duration = _ref17.duration,
        intervalDuration = _ref17.intervalDuration;

    return (0, _compose.getTimer)(id).then(function (timer) {
      if (ctx && ctx.user.id === timer.userId) {
        var updatePropsObj = {};

        if (name) {
          updatePropsObj.name = name;
        }

        if (duration) {
          updatePropsObj.duration = duration;
        }

        if (intervalDuration) {
          updatePropsObj.intervalDuration = intervalDuration;
        }

        var updatedTimer = (0, _compose.updateTimer)(id, updatePropsObj);
        return updatedTimer;
      } else {
        return null;
      }
    }).catch(function (e) {
      return e;
    });
  },

  deleteTimer: function deleteTimer(_, _ref18, ctx) {
    var id = _ref18.id;

    return (0, _compose.getTimer)(id).then(function (timer) {
      if (ctx && ctx.user.id === timer.userId) {
        var _timer = (0, _compose.deleteTimer)(id);
        return _timer;
      } else {
        return null;
      }
    }).catch(function (e) {
      return e;
    });
  },

  createTimerAlert: function createTimerAlert(_, _ref19, ctx) {
    var timerId = _ref19.timerId,
        activationTime = _ref19.activationTime,
        message = _ref19.message;

    return (0, _compose.getTimer)(timerId).then(function (timer) {
      if (ctx && ctx.user.id === timer.userId) {
        var timerAlert = (0, _compose.createTimerAlert)(timerId, activationTime, message);
        return timerAlert;
      } else {
        return null;
      }
    }).catch(function (e) {
      return e;
    });
  },

  updateTimerAlert: function updateTimerAlert(_, _ref20, ctx) {
    var id = _ref20.id,
        timerId = _ref20.timerId,
        activationTime = _ref20.activationTime,
        message = _ref20.message;

    return (0, _compose.getTimerAlert)(id).then(function (timerAlert) {
      return (0, _compose.getTimer)(timerAlert.timerId).then(function (timer) {
        if (ctx && ctx.user.id === timer.userId) {
          var updatePropsObj = {};

          if (timerId) {
            updatePropsObj.timerId = timerId;
          }

          if (typeof activationTime === 'number') {
            updatePropsObj.activationTime = activationTime;
          }

          if (message) {
            updatePropsObj.message = message;
          }

          var _timerAlert = (0, _compose.updateTimerAlert)(id, updatePropsObj);

          return _timerAlert;
        } else {
          return null;
        }
      }).catch(function (e) {
        return e;
      });
    }).catch(function (e) {
      return e;
    });
  },

  activateTimerAlert: function activateTimerAlert(_, _ref21, ctx) {
    var id = _ref21.id;

    return (0, _compose.getTimerAlert)(id).then(function (timerAlert) {
      return (0, _compose.getTimer)(timerAlert.timerId).then(function (timer) {
        if (ctx && ctx.user.id === timer.userId) {
          var activatedTimerAlert = (0, _compose.activateTimerAlert)(id);
          return activatedTimerAlert;
        } else {
          return null;
        }
      }).catch(function (e) {
        return e;
      });
    }).catch(function (e) {
      return e;
    });
  },

  deleteTimerAlert: function deleteTimerAlert(_, _ref22, ctx) {
    var id = _ref22.id;

    return (0, _compose.getTimerAlert)(id).then(function (timerAlert) {
      return (0, _compose.getTimer)(timerAlert.timerId).then(function (timer) {
        if (ctx && ctx.user.id === timer.userId) {
          var deletedTimerAlert = (0, _compose.deleteTimerAlert)(id);
          return deletedTimerAlert;
        } else {
          return null;
        }
      }).catch(function (e) {
        return e;
      });
    }).catch(function (e) {
      return e;
    });
  }
};
//# sourceMappingURL=mutation.js.map