import express from 'express'
import session from "express-session"
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import schema from './schema'
import { createUser, authenticateUser, getUser } from './compose'
import passport from 'passport'
import cors from 'cors'
import { isUsernameUnique } from './adapters/userAdapter'
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
  uri: process.env.LOCAL_DB_URL,
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
  secure: secure
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())

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

app.post('/signup', (req, res) => {
  createUser(req.body.username, req.body.password).then(user => {
    req.login(user, err => {
      if(err) res.sendStatus(500)
      res.redirect('/')
    })
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