import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const flash = require('express-flash');
const session = require("express-session");
const passport = require("passport");
const bcrypt = require('bcrypt');
const LocalStrategy = require("passport-local").Strategy;


const app = express();

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}


passport.use(
  new LocalStrategy(async (username, password, done) => {
     
      try {
          const user = await User.findOne({ username: username});
          const match = await bcrypt.compare(password, user.password);
          if(!user) {
              return done(null, false, {message: "Incorrect username"});
          };
          if (!match) {
              return done(null, false, {message: "Incorrect password"});
          };
          return done(null, user);

      } catch(err) {
          return done(err);
      };
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
      const user = await User.findById(id);
      done(null, user);
  } catch(err) {
      done(err)
  };
});





app.use(cors());
app.use(flash());
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded())


const blogRouter = require('./routes/blog');
const indexRouter = require('./routes/index');

app.use("/", indexRouter);
app.use('/blog', blogRouter);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);