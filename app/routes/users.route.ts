import express, { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  removeUserById
} from '../controllers/user.controller';
import { authenticate } from '../utils/auth';

const router: Router = express.Router();

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.get('/', authenticate, getAllUsers);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A user object
 *       404:
 *         description: User not found
 */
router.get('/:id', getUserById);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   patch:
 *     summary: Update a user by ID
 *     description: Update a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *       - in: body
 *         name: body
 *         description: Fields to update
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A user object
 *       404:
 *         description: User not found
 */
router.patch('/:id', updateUserById);

/**
 * @swagger
 * /api/v1/users/delete/{id}:
 *   patch:
 *     summary: Soft delete a user by ID
 *     description: Soft delete a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A user object
 *       404:
 *         description: User not found
 */
router.patch('/delete/:id', deleteUserById);

/**
 * @swagger
 * /api/v1/users/delete/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A user object
 *       404:
 *         description: User not found
 */
router.delete('/delete/:id', removeUserById);

export = router;