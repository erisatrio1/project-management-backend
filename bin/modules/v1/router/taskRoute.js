import express from 'express'
import { getTasks, getTaskById, createTask, updateTask, deleteTask } from '../controller/tasksController.js'
import { verifyUser, productOwnerOnly } from '../middleware/userAuth.js'

const router = express.Router();

router.get('/tasks',verifyUser, getTasks);
router.get('/task/:id', verifyUser, getTaskById);
router.post('/task', verifyUser, productOwnerOnly, createTask);
router.patch('/task/:id', verifyUser, productOwnerOnly, updateTask);
router.delete('/task/:id', verifyUser, productOwnerOnly, deleteTask);

export default router;