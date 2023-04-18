import express, { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  removeUserById
} from '../controllers/user.controller';

const router: Router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.patch('/:id', updateUserById);
router.patch('/delete/:id', deleteUserById);
router.delete('/delete/:id', removeUserById);
router.post('/', createUser);

export = router;
