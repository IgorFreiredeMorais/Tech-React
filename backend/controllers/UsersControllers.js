const User = require("../models/User");
const bcrypt = require("bcryptjs");

class UsersControllers {
  async index(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json();
      }

      return res.json(user);
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json();
      }

      await user.deleteOne();
      return res.status(200).json();
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { email, password } = req.body;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json();
      }

      const saltRounds = 8;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await user.updateOne({ email, password: hashedPassword });

      return res.status(200).json();
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async create(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (user) {
        return res
          .status(422)
          .json({ message: `User ${email} already exists.` });
      }

      //criptografia da senha

      const saltRounds = 8;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = await User.create({
        email,
        password: hashedPassword,
      });
      return res.status(201).json(newUser);
    } catch (error) {
      console.log(`Erro: ${error}`);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
}

module.exports = UsersControllers;
