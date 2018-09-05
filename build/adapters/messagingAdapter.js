"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var twilio = require("twilio");

var client = new twilio(process.env.ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

var sendMessage = exports.sendMessage = function sendMessage(message) {
	client.messages.create({
		from: process.env.FROM_NUMBER,
		to: process.env.TO_NUMBER,
		body: message
	}).then(function (message) {
		return console.log(message.sid);
	}).catch(function (e) {
		return e;
	});
};
//# sourceMappingURL=messagingAdapter.js.map