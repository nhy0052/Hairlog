const passport = require('passport');
const bcrypt = require('bcrypt');


const User = require('../../../DB/sequelize/models/User');


const join = async (req, res, next) => {
    const { userEmail, userPassword, userName, userSex, userCycle } = req.body;
    try {
      const exUser = await User.findOne({ where: { userEmail } });
      if (exUser) {
        return res.redirect('/join?error=exist');
      }
      const hash = await bcrypt.hash(userPassword, 12);
      await User.create({
        userEmail,
        userPassword : hash,
        userName,
        userSex,
        userCycle,
      });
      return res.send("Join Success");
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

const authenticate = (req, res, next) => {
    passport.authenticate('local', (authError, user) => {
      if (authError) {
        console.error(authError);
        return next(authError);
      };
      if (!user) {
        ;
        return res.status(404).send('NO EXISTING USER');
      };
      return req.login(user, (loginError) => {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        };
        ;
        return res.status(200).send("Login Success")
      });
    })(req, res, next);
};

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
      next();
  } else {
      res.status(404).send('로그인 필요');
  }
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
      next();
  } else {
      const message = encodeURIComponent('로그인한 상태입니다.');
      res.redirect(`/?error=${message}`);
  }
};

module.exports = { join , authenticate, isLoggedIn, isNotLoggedIn}
