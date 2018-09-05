'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _compose = require('../../compose');

exports.default = {
  id: function id(inventory) {
    return inventory.id;
  },
  user: function user(inventory) {
    return (0, _compose.getUser)(inventory.userId);
  },
  name: function name(inventory) {
    return inventory.name;
  },
  items: function items(inventory) {
    return inventory.items;
  }
};
//# sourceMappingURL=inventory.js.map