import { body } from "express-validator";

export const loginValidation = [
  body("fullName", "FullName must be more then 3 symbols").isLength({
    min: 3,
  }),
  body("password", "Password must be more then 5 symbols").isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body("fullName", "FullName must be more then 3 symbols").isLength({
    min: 3,
  }),
  body("password", "Password must be more then 5 symbols").isLength({
    min: 5,
  }),
];

export const taskCreateValidation = [
  body("text", "Enter tasks text").isLength({ min: 3 }).isString(),
  body("completed", "Enter tasks state").isBoolean().optional(),
];
