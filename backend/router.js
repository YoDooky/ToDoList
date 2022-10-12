import { TaskController, UserController } from "./controllers/index.js";
import {
  taskCreateValidation,
  loginValidation,
  registerValidation,
} from "./validations.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import { Router } from "express";
import checkAuth from "./utils/checkAuth.js";

const router = new Router();
//authorization
router.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);

//registration with validation
router.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);

//CRUD
//get all tasks
router.get("/tasks", TaskController.getAll);
//get one task
router.get("/tasks/:id", TaskController.getOne);
//create task
router.post(
  "/tasks",
  checkAuth,
  taskCreateValidation,
  handleValidationErrors,
  TaskController.create
);
//delete task
router.delete("/tasks/:id", checkAuth, TaskController.remove);
//update task
router.patch(
  "/tasks/:id",
  checkAuth,
  // taskCreateValidation,
  handleValidationErrors,
  TaskController.update
);

router.get("/tasks/user/:id", checkAuth, TaskController.getUserTasks);

export default router;
