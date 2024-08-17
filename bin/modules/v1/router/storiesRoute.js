import express from 'express'
import { getStories, getStorytById, createStory, updateStory, deleteStory } from '../controller/storiesController.js'
import { verifyUser, productOwnerOnly } from '../middleware/userAuth.js'

const router = express.Router();

router.get('/stories',verifyUser, getStories);
router.get('/story/:id', verifyUser, getStorytById);
router.post('/story', verifyUser, productOwnerOnly, createStory);
router.patch('/story/:id', verifyUser, productOwnerOnly, updateStory);
router.delete('/story/:id', verifyUser, productOwnerOnly, deleteStory);

export default router;