import express from 'express'
import { getUsers, getUserProjects, getUserById, createUser, updateUsername, updateUserRole, updateAccount, deleteUser } from '../controller/usersController.js'
import { verifyUser, adminOnly, productOwnerOnly } from '../middleware/userAuth.js'

const router = express.Router();

router.get('/users',verifyUser, adminOnly, getUsers);
router.get('/userprojects',verifyUser,  getUserProjects);
router.get('/user/:id', verifyUser, getUserById);
// router.post('/user', verifyUser, createUser);
router.post('/user', createUser);
router.patch('/user/:id', verifyUser, updateUsername);
router.patch('/user/:id', verifyUser, productOwnerOnly, updateUserRole);
router.patch('/user/:id', verifyUser, updateAccount);
router.delete('/user/:id', verifyUser, deleteUser);

export default router;