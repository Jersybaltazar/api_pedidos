import { Router } from 'express';
import { authRouter } from './auth';
import { ordersRouter } from './order';
import { authenticate } from '../middleware/auth';

export const router = Router();

router.use('/auth', authRouter);
router.use('/order', authenticate, ordersRouter);