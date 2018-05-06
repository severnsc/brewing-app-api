import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'

const transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
}))

export const sendRecoveryEmail = (email, token, url) => {
  const mailOptions = {
    from: "Chris Severns",
    to: email,
    subject: "Password reset requested",
    text: `We recently received a request to rest your password. Click here to reset your password: ${url}/resetPassword?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)} If you did not make this request, ignore this email. Your account is secure.`,
    html: `<p>We recently received a request to rest your password. Click here to reset your password: <a href="${url}/resetPassword?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}">${url}/resetPassword?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}</a> If you did not make this request, ignore this email. Your account is secure.</p>`,
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if(err){
      return console.log(err)
    }

    console.log("Message sent: ", info.messageId)
  })
}