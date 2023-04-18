import express, { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  removeUserById
} from '../controllers/user.controller';
import { authenticate } from '../utils/auth';

const router: Router = express.Router();

router.get('/', authenticate, getAllUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.patch('/:id', updateUserById);
router.patch('/delete/:id', deleteUserById);
router.delete('/delete/:id', removeUserById);

export = router;
