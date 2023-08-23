import express from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../Controllers/userController.js';

const router = express.Router();


router.route('/').get(getUsers).post(createUser).put(updateUser).delete(deleteUser)

export default router;