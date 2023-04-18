import express, { Request, Response, NextFunction } from 'express';
import { register, login } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/refresh-token', async (req: Request, res: Response, next: NextFunction) => {
  res.send('refresh-token');
});

router.delete('/logout', async (req: Request, res: Response, next: NextFunction) => {
  res.send('logout');
});

export default router;
