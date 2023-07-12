const router = require("express").Router();
const HelloControllers = require("../controllers/HelloController");

const usersController = new HelloControllers();

router.route("/hello").get((req, res) => usersController.index(req, res));

module.exports = router;
