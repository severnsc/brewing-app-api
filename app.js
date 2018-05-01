import express from 'express'
import session from "express-session"
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import schema from './schema'
import { authenticateUser, getUser } from './compose'
import passport from 'passport'
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

app.use(bodyParser.json())
app.use(session({ 
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

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

app.use('/graphql', ensureAuth, bodyParser.json(), graphqlExpress({ schema }))

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.get('/', (req, res) => {
  res.json({user: req.user})
})

app.get('/login', (req, res) => {
  res.status(200).send("Please login")
})

app.post('/login', passport.authenticate('local', { 
  successRedirect: '/',
  failureRedirect: '/login'
}))

export default app