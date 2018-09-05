'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _compose = require('../../compose');

exports.default = {
  id: function id(user) {
    return user.id;
  },
  userName: function userName(user) {
    return user.userName;
  },
  timers: function timers(user) {
    return (0, _compose.getTimersByUserId)(user.id);
  },
  inventories: function inventories(user) {
    return (0, _compose.getInventoriesByUserId)(user.id);
  }
};
//# sourceMappingURL=user.js.map