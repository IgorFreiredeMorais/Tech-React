const router = require("express").Router();

const SessionController = require("../controllers/SessionController");

const sessionController = new SessionController();

router
  .route("/sessions")
  .post((req, res) => sessionController.create(req, res));

module.exports = router;
