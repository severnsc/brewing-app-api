import express from 'express'
import session from "express-session"
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import schema from './schema'
import { createUser, authenticateUser, getUser, updateUser } from './compose'
import passport from 'passport'
import cors from 'cors'
import { isUsernameUnique, findUserByUsername, findUserByEmail, hashPassword } from './adapters/userAdapter'
import validator from 'validator'
import { generateResetToken, hashToken, saveResetHash, findHash, deleteResetHash } from './adapters/tokenAdapter'
import { sendRecoveryEmail } from './adapters/emailAdapter'
const MongoDBStore = require('connect-mongodb-session')(session)
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy(
  (username, password, done) => {
    authenticateUser(username, password).then(user => {
      return done(null, user)
    }).catch(e => {
      if(e.message === "Could not find the user with given userName!"){
        return done(null, false, {message: "Invalid username or password"})
      }else{
        return done(e)
      }
    })
  }
));

const app = express()

const store = new MongoDBStore({
  uri: process.env.DB_URL,
  databaseName: 'brewing-app-db',
  collection: "sessions"
})

store.on('error', error => {
  console.log(error)
})

const secure = process.env.NODE_ENV !== 'dev'
app.use(bodyParser.json())
app.use(session({ 
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,
  secure: secure,
  cookie: {maxAge: 60*10000}
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({origin: process.env.ORIGIN, credentials: true}))

passport.serializeUser((user, done) => {
  console.log("serializeUser")
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("deserializeUser called!")
  getUser(id).then(user => {
    done(null, user)
  }).catch(e => {
    done(e)
  })
});

const ensureAuth = (req, res, next) => {
  if(req.isAuthenticated()){
    next()
  }else{
    res.sendStatus(401)
  }
}

app.use('/graphql', ensureAuth, bodyParser.json(), graphqlExpress(req => {
  return { schema, context: {user: req.user} }
}))

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.get('/', (req, res) => {
  res.sendStatus(200)
})

app.get('/login', (req, res) => {
  res.status(200).send("Please login")
})

app.get('/logout', (req, res) => {
  req.logout()
  const fullUrl = req.headers.referer
  const baseUrl = fullUrl.split(/[\/][a-zA-Z]*$/)[0]
  res.redirect(baseUrl)
})

app.post('/resetForm', (req, res) => {
  const token = decodeURIComponent(req.query.token)
  const email = decodeURIComponent(req.query.email)
  findHash(token).then(async result => {
    if(result){
      if(result.email === email && Date.now() < result.expires){
        const user = await findUserByEmail(email).catch(e => e)
        const hashedPassword = hashPassword(req.body.password)
        await updateUser(user.id, {hashedPassword}).catch(e => e)
        await deleteResetHash(token).catch(e => e)
        console.log("password reset for user", user.userName)
        res.redirect(result.callbackURL)
      }else{
        res.redirect(result.callbackURL)
      }
    }else{
      res.redirect(req.get('origin'))
    }
  })
})

app.post('/signup', (req, res) => {
  if(!validator.isEmail(req.body.email)){
    res.status(400).send("Email invalid!")
  }else{
    createUser(req.body.username, req.body.password, req.body.email).then(user => {
      req.login(user, err => {
        if(err) res.sendStatus(500)
        res.redirect('/')
      })
    }).catch(e => res.status(500).send("Error!" + e))
  }
})

app.post('/sendRecoveryEmail', (req, res) => {
  findUserByUsername(req.body.username).then(user => {
    if(user){
      const url = req.get('origin')
      const resetToken = generateResetToken()
      const tokenHash = hashToken(resetToken)
      saveResetHash(user.email, tokenHash, url).then(() => {
        sendRecoveryEmail(user.email, resetToken, url)
        res.sendStatus(200)
      }).catch(e => res.sendStatus(500))
    }else{
      res.sendStatus(200)
    }
  })
})

app.post('/isUsernameUnique', (req, res) => {
  isUsernameUnique(req.body.username).then(bool => {
    res.status(200).send(bool)
  }).catch(e => res.status(500).send(e))
})

app.post('/login', passport.authenticate('local', { 
  successRedirect: '/',
  failureRedirect: '/login'
}))

export default app