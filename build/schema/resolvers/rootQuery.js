'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _compose = require('../../compose');

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

exports.default = {
  user: function user(_, _ref, ctx) {
    var id = _ref.id;

    if (ctx.user.id === id) return (0, _compose.getUser)(id);
    return null;
  },

  currentUser: function currentUser(_, _ref2, ctx) {
    _objectDestructuringEmpty(_ref2);

    if (ctx.user) return (0, _compose.getUser)(ctx.user.id);
    return null;
  }
};
//# sourceMappingURL=rootQuery.js.map