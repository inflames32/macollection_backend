const User = require("../models/user");
const Album = require("../models/album");
const User_has_albums = require("../models/userHasAlbums");
const bcrypt = require("bcrypt");
var validator = require("validator");

const userController = {
  // connection
  signin: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const bodyErrors = [];

    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });

      //tester si l'email est bien reconuu
      if (!validator.isEmail(email)) {
        bodyErrors.push("not an email");
        return res.status(400);
      }

      // user exists ?
      if (!user) {
        bodyErrors.push("user not found");
        return res.status(400);
      }

      // email is empty
      if (!email) {
        bodyErrors.push("not email ");
        return res.status(400);
      }

      // password is empty
      if (!password) {
        bodyErrors.push("not password");
        return res.status(400);
      }

      // if errors
      if (bodyErrors.length) {
        res.json({
          message: bodyErrors,
        });
        return res.status(400);
      }

      const passwordhash = await bcrypt.compare(password, user.password);

      if (passwordhash === true) {
        res.json({
          message: "Bienvenu(e) " + user.username,
          user: {
            id: user.id,
            username: user.username,
          },
          islogged: true,
        });
      }
    } catch (err) {
      res.json({ message: err });
      return res.status(400);
    }
  },

  signup: async (req, res) => {
    try {
      const { email, password, password_validation, username } = req.body;
      const bodyErrors = [];
      const isAnEmail = validator.isEmail(email);
      console.log(isAnEmail);
      const userExists = await User.findOne({
        where: {
          email,
          username,
        },
      });
      if (!email && !password && !username) {
        bodyErrors.push("email or password empty");
      }
      if (password !== password_validation) {
        bodyErrors.push("passwords are differents");
      }

      if (!isAnEmail) {
        bodyErrors.push("it's not an email");
      }
      if (userExists) {
        bodyErrors.push("email exists");
      }

      if (bodyErrors.length) {
        res.json({
          message: bodyErrors,
        });
        return res.status(400);
      } else {
        const saltRounds = 10;
        const user = await User.create({
          email: email,
          username: username,
          password: await bcrypt.hash(password, saltRounds),
        });
        user.save();
        res.json({
          message: "user created",
          user,
        });
      }
    } catch (err) {
      res.json({ message: err });
    }
  },

  disconnect: async (req, res) => {
    try {
    } catch (err) {
      console.log(err);
    }
  },

  getUserByUsername: async (req, res) => {
    const username = req.params.username;
    console.log(username);
    try {
      /* const username = req.params.username; */
      const user = User.findOne({
        where: {
          username: username,
        },
      });
      if (!username) {
        return res.status(404).json(`can't find this user` + username);
      }
      res.json({ username: user.username, email: user.email });
      console.log(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
