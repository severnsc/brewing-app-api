'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _compose = require('../../compose');

exports.default = {
  id: function id(timer) {
    return timer.id;
  },
  user: function user(timer) {
    return (0, _compose.getUser)(timer.userId);
  },
  name: function name(timer) {
    return timer.name;
  },
  duration: function duration(timer) {
    return timer.duration;
  },
  remainingDuration: function remainingDuration(timer) {
    return timer.remainingDuration;
  },
  intervalDuration: function intervalDuration(timer) {
    return timer.intervalDuration;
  },
  isRunning: function isRunning(timer) {
    return timer.isRunning;
  },
  timerAlerts: function timerAlerts(timer) {
    return (0, _compose.getTimerAlertsByTimerId)(timer.id);
  }
};
//# sourceMappingURL=timer.js.map