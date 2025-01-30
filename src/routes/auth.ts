import { Router, Request, Response, NextFunction } from 'express';

import { AuthController } from '../controllers/auth.controller';
import { validateAlt } from '../middleware/validation';
import { body } from 'express-validator';

const router = Router();

const registrationValidations = [
  body('email')
    .isEmail()
    .withMessage('The email must be a valid email address')
    .normalizeEmail(),
  body('password')
  .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
  .matches(/[A-Z]/).withMessage("Must contain at least one uppercase letter.")
  .matches(/[0-9]/).withMessage("Must contain at least one number."),
];

const loginValidations = [
  body('email').isEmail().normalizeEmail(),
  body('password').exists()
];

router.post('/register', registrationValidations, validateAlt, AuthController.register);
router.post('/login', loginValidations, validateAlt, AuthController.login);

export const authRouter = router;