import express from 'express'
import { getSprints, getSprintById, createSprint, updateSprint, deleteSprint } from '../controller/sprintsController.js'
import { verifyUser, productOwnerOnly } from '../middleware/userAuth.js'

const router = express.Router();

router.get('/sprints',verifyUser, getSprints);
router.get('/sprint/:id', verifyUser, getSprintById);
router.post('/sprint', verifyUser, productOwnerOnly, createSprint);
router.patch('/sprint/:id', verifyUser, productOwnerOnly, updateSprint);
router.delete('/sprint/:id', verifyUser, productOwnerOnly, deleteSprint);

export default router;