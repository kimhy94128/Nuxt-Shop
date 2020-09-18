
const LocalStrategy = require('passport-local').Strategy;

const { users } = require('../../models');
const db = require('../../db');

module.exports = new LocalStrategy({
  usernameField: 'uid',
  passwordField: 'password',
  passReqToCallback: true
},function(req, userid, password, done){
  if(!userid || !password) return done(null, false);

  db.query(`SELECT * FROM users WHERE uid = ?`, userid, (err, result) => {
    if(result[0] == undefined){
      done(null, false)
    } else {
      if(result[0].password == password){
        done(null, {
          uid: result[0].uid,
          id: result[0].id,
          status: result[0].status
        })
      } else {
        done(null, false)
      }
    }
  })
})