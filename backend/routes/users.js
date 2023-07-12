const router = require("express").Router();
const UsersControllers = require("../controllers/UsersControllers");

const usersController = new UsersControllers();

router.route("/users").post((req, res) => usersController.create(req, res));
router.route("/users").get((req, res) => usersController.index(req, res));
router.route("/users/:id").get((req, res) => usersController.show(req, res));
router.route("/users/:id").put((req, res) => usersController.update(req, res));
router
  .route("/users/:id")
  .delete((req, res) => usersController.destroy(req, res));

module.exports = router;
