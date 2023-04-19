import express, { Request, Response, NextFunction } from 'express';
import { register, login, requestRefreshToken } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/refresh-token', requestRefreshToken);

router.delete('/logout', async (req: Request, res: Response, next: NextFunction) => {
  res.send('logout');
});

export default router;
