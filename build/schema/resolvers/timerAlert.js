"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  id: function id(timerAlert) {
    return timerAlert.id;
  },
  timer: function timer(timerAlert) {
    return getTimer(timerAlert.timerId);
  },
  activationTime: function activationTime(timerAlert) {
    return timerAlert.activationTime;
  },
  message: function message(timerAlert) {
    return timerAlert.message;
  },
  activated: function activated(timerAlert) {
    return timerAlert.activated;
  }
};
//# sourceMappingURL=timerAlert.js.map