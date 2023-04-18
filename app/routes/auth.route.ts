import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  res.send('register');
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  res.send('login');
});

router.post('/refresh-token', async (req: Request, res: Response, next: NextFunction) => {
  res.send('refresh-token');
});

router.delete('/logout', async (req: Request, res: Response, next: NextFunction) => {
  res.send('logout');
});

export default router;
