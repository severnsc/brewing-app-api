'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendRecoveryEmail = undefined;

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _nodemailerSmtpTransport = require('nodemailer-smtp-transport');

var _nodemailerSmtpTransport2 = _interopRequireDefault(_nodemailerSmtpTransport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transporter = _nodemailer2.default.createTransport((0, _nodemailerSmtpTransport2.default)({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
}));

var sendRecoveryEmail = exports.sendRecoveryEmail = function sendRecoveryEmail(email, token, url) {
  var mailOptions = {
    from: "Chris Severns",
    to: email,
    subject: "Password reset requested",
    text: 'We recently received a request to rest your password. Click here to reset your password: ' + url + '/resetPassword?email=' + encodeURIComponent(email) + '&token=' + encodeURIComponent(token) + ' If you did not make this request, ignore this email. Your account is secure.',
    html: '<p>We recently received a request to rest your password. Click here to reset your password: <a href="' + url + '/resetPassword?email=' + encodeURIComponent(email) + '&token=' + encodeURIComponent(token) + '">' + url + '/resetPassword?email=' + encodeURIComponent(email) + '&token=' + encodeURIComponent(token) + '</a> If you did not make this request, ignore this email. Your account is secure.</p>'
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      return console.log(err);
    }

    console.log("Message sent: ", info.messageId);
  });
};
//# sourceMappingURL=emailAdapter.js.map