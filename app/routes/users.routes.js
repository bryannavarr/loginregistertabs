const router = require("express").Router();
const usersController = require("../controllers/users.controller");
const validateBody = require("../filters/validate.body");
const User = require("../models/users");
const UsersLogin = require("../models/usersLogin");
const Password = require("../models/resetPassword");
const idFilter = require("../filters/id.filter");

module.exports = router;

router.get("/", usersController.readAll);
router.get("/:id([0-9a-fA-F]{24})", usersController.readById);
router.put(
  "/:id([0-9a-fA-F]{24})",
  idFilter.bodyIdRequired,
  usersController.update
);
router.put(
  "/reset-password",
  validateBody(Password.ResetSchema),
  usersController.resetPassword
);
router.post(
  "/register",
  validateBody(User.registerSchema),
  usersController.register
);
router.post(
  "/",
  idFilter.bodyIdDisallowed,
  validateBody(User.baseSchema),
  usersController.create
);
router.post("/login", validateBody(UsersLogin), usersController.login);
router.post("/logout", usersController.logout);
router.delete("/:id([0-9a-fA-F]{24})", usersController.delete);
