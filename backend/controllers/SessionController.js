const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const checkPassword = (user, password) =>
  bcrypt.compare(password, user.password);

class SessionController {
  async create(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "User / password invalid." });
    }

    if (!checkPassword(user, password)) {
      return res.status(401).json({ error: "User / password invalid." });
    }

    const { id } = user;

    return res.json({
      user: {
        id,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

module.exports = SessionController;
