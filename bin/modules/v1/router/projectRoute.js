import express from 'express'
import { getProjects, getProjectById, joinProject, createProject, updateProject, deleteProject } from '../controller/projectController.js'
import { verifyUser, adminOnly } from '../middleware/userAuth.js'

const router = express.Router();

router.get('/projects',verifyUser, adminOnly, getProjects);
router.get('/project/:id', verifyUser, getProjectById);
router.post('/project', verifyUser, createProject);
router.post('/joinproject', verifyUser, joinProject);
router.patch('/project/:id', verifyUser, updateProject);
router.delete('/project/:id', verifyUser, deleteProject);

export default router;