class HelloController {
  async index(req, res) {
    res.json({ hello: "world" });
  }
}

module.exports = HelloController;
