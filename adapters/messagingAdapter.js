const twilio = require("twilio")

const client = new twilio(process.env.ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

export const sendMessage = message => {
	client.messages.create({
		from: process.env.FROM_NUMBER,
		to: process.env.TO_NUMBER,
		body: message
	})
	.then(message => console.log(message.sid))
	.catch(e => e)
}