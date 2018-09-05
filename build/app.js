'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _apolloServerExpress = require('apollo-server-express');

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _compose = require('./compose');

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _userAdapter = require('./adapters/userAdapter');

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _tokenAdapter = require('./adapters/tokenAdapter');

var _emailAdapter = require('./adapters/emailAdapter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var MongoDBStore = require('connect-mongodb-session')(_expressSession2.default);
var LocalStrategy = require('passport-local').Strategy;

_passport2.default.use(new LocalStrategy(function (username, password, done) {
  (0, _compose.authenticateUser)(username, password).then(function (user) {
    return done(null, user);
  }).catch(function (e) {
    if (e.message === "Could not find the user with given userName!") {
      return done(null, false, { message: "Invalid username or password" });
    } else {
      return done(e);
    }
  });
}));

var app = (0, _express2.default)();

var store = new MongoDBStore({
  uri: process.env.DB_URL,
  databaseName: 'brewing-app-db',
  collection: "sessions"
});

store.on('error', function (error) {
  console.log(error);
});

var secure = process.env.NODE_ENV !== 'dev';
app.use(_bodyParser2.default.json());
app.use((0, _expressSession2.default)({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,
  secure: secure
}));
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());
app.use((0, _cors2.default)({ origin: "http://localhost:3000", credentials: true }));

_passport2.default.serializeUser(function (user, done) {
  console.log("serializeUser");
  done(null, user.id);
});

_passport2.default.deserializeUser(function (id, done) {
  console.log("deserializeUser called!");
  (0, _compose.getUser)(id).then(function (user) {
    done(null, user);
  }).catch(function (e) {
    done(e);
  });
});

var ensureAuth = function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.sendStatus(401);
  }
};

app.use('/graphql', ensureAuth, _bodyParser2.default.json(), (0, _apolloServerExpress.graphqlExpress)(function (req) {
  return { schema: _schema2.default, context: { user: req.user } };
}));

app.use('/graphiql', (0, _apolloServerExpress.graphiqlExpress)({ endpointURL: '/graphql' }));

app.get('/', function (req, res) {
  res.sendStatus(200);
});

app.get('/login', function (req, res) {
  res.status(200).send("Please login");
});

app.get('/logout', function (req, res) {
  req.logout();
  var fullUrl = req.headers.referer;
  var baseUrl = fullUrl.split(/[\/][a-zA-Z]*$/)[0];
  res.redirect(baseUrl);
});

app.post('/resetForm', function (req, res) {
  var token = decodeURIComponent(req.query.token);
  var email = decodeURIComponent(req.query.email);
  (0, _tokenAdapter.findHash)(token).then(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(result) {
      var user, hashedPassword;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!result) {
                _context.next = 17;
                break;
              }

              if (!(result.email === email && Date.now() < result.expires)) {
                _context.next = 14;
                break;
              }

              _context.next = 4;
              return (0, _userAdapter.findUserByEmail)(email).catch(function (e) {
                return e;
              });

            case 4:
              user = _context.sent;
              hashedPassword = (0, _userAdapter.hashPassword)(req.body.password);
              _context.next = 8;
              return (0, _compose.updateUser)(user.id, { hashedPassword: hashedPassword }).catch(function (e) {
                return e;
              });

            case 8:
              _context.next = 10;
              return (0, _tokenAdapter.deleteResetHash)(token).catch(function (e) {
                return e;
              });

            case 10:
              console.log("password reset for user", user.userName);
              res.redirect(result.callbackURL);
              _context.next = 15;
              break;

            case 14:
              res.redirect(result.callbackURL);

            case 15:
              _context.next = 18;
              break;

            case 17:
              res.redirect(req.get('origin'));

            case 18:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
});

app.post('/signup', function (req, res) {
  if (!_validator2.default.isEmail(req.body.email)) {
    res.status(400).send("Email invalid!");
  } else {
    (0, _compose.createUser)(req.body.username, req.body.password, req.body.email).then(function (user) {
      req.login(user, function (err) {
        if (err) res.sendStatus(500);
        res.redirect('/');
      });
    }).catch(function (e) {
      return res.status(500).send("Error!" + e);
    });
  }
});

app.post('/sendRecoveryEmail', function (req, res) {
  (0, _userAdapter.findUserByUsername)(req.body.username).then(function (user) {
    if (user) {
      var url = req.get('origin');
      var resetToken = (0, _tokenAdapter.generateResetToken)();
      var tokenHash = (0, _tokenAdapter.hashToken)(resetToken);
      (0, _tokenAdapter.saveResetHash)(user.email, tokenHash, url).then(function () {
        (0, _emailAdapter.sendRecoveryEmail)(user.email, resetToken, url);
        res.sendStatus(200);
      }).catch(function (e) {
        return res.sendStatus(500);
      });
    } else {
      res.sendStatus(200);
    }
  });
});

app.post('/isUsernameUnique', function (req, res) {
  (0, _userAdapter.isUsernameUnique)(req.body.username).then(function (bool) {
    res.status(200).send(bool);
  }).catch(function (e) {
    return res.status(500).send(e);
  });
});

app.post('/login', _passport2.default.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

exports.default = app;
//# sourceMappingURL=app.js.map