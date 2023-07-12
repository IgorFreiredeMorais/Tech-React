const router = require("express").Router();

const auth = require("../middlewares/auth");

const HelloRouter = require("./hello");
const SessionRouter = require("./session");

router.use("/", HelloRouter);

router.use("/", SessionRouter);

router.use(auth);

const UsersRouter = require("./users");

router.use("/", UsersRouter);

module.exports = router;
