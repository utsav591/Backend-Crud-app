import express  from "express";
import { createUser ,deleteUser, getUsers, updateUser } from "../Controllers/userController.js";

const router = express.Router();


router.route('/').get(getUsers).post(createUser).put(updateUser).delete(deleteUser)

export default router;