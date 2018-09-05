'use strict';

require('@babel/polyfill');

var _databaseAdapter = require('./adapters/databaseAdapter');

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _compose = require('./compose');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.listen(process.env.BREWING_APP_PORT || process.env.PORT, function () {
  (0, _databaseAdapter.dbConnection)(function () {
    setInterval(function () {
      return (0, _compose.decrementTimers)();
    }, 1000);
    console.log('Go to http://localhost:' + process.env.BREWING_APP_PORT + '/graphiql to run queries!');
  });
});
//# sourceMappingURL=server.js.map