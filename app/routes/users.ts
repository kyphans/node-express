import express, { Router } from 'express';
import { getAllUsers, getUserById, createUser } from '../controllers/user.controller';

const router: Router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);

export = router;
