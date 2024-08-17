import express from 'express'
import { getComments, getCommentById, createComment, updateComment, deleteComment } from '../controller/commentsController.js'
import { verifyUser } from '../middleware/userAuth.js'

const router = express.Router();

router.get('/comments',verifyUser, getComments);
router.get('/comment/:id', verifyUser, getCommentById);
router.post('/comment', verifyUser, createComment);
router.patch('/comment/:id', verifyUser, updateComment);
router.delete('/comment/:id', verifyUser, deleteComment);

export default router;