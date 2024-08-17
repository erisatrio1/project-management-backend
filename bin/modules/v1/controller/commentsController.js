import { baseResponse } from "../../../utils/Response.js";
import { getCommentsRepo, getCommentByIdRepo, createCommentRepo, updateCommentRepo, deleteCommentRepo } from "../repository/commentsRepo.js"
import { CreateComment } from '../../../entity/Create.js';

export const getComments = async(req, res) => {
    const storyId = req.query.storyId;
    const { data, error } = await getCommentsRepo(storyId)
    if (data.length === 0) return res.status(404).json(baseResponse(404, 'Data Not found!', null));
    if(error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, null, data));
    }
}

export const getCommentById = async(req, res) => {
    const { data, error } = await getCommentByIdRepo(req.params.id)
    if (data.length === 0) return res.status(404).json(baseResponse(404, 'Data Not found!', null));
    if(error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, null, data));
    }
}

export const createComment = async(req, res) => {
    const storyId = req.query.storyId
    const userId = req.userId
    const payload = req.body;
    const newComment = CreateComment(payload);
    const { data, error } = await createCommentRepo(storyId, userId, newComment);
    if (error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, 'Create Task Success', data));   
    }
}

export const updateComment = async(req, res) => {
    const commentId = req.params.id;
    const payload = req.body;
    const newComment = CreateComment(payload);

    if (commentId === undefined ) {
        res.status(404).json(baseResponse(404, "Data not found!", null));
    }

    const getComment = await getCommentByIdRepo(commentId);

    if (getComment.error) {
        res.status(500).json(baseResponse(500, getComment.error.message, null));
        return
    }

    if (getComment.data.length === 0) {
        res.status(404).json(baseResponse(404, "Data not found!", null));
        return
    }

    const { data, error } = await updateCommentRepo(commentId, newComment);
    if (error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, 'Update Comment Success', data));   
    }
}

export const deleteComment = async(req, res) => {
    const commentId = req.params.id;

    if (commentId === undefined ) {
        res.status(404).json(baseResponse(404, "Data not found!", null));
    }

    const getComment = await getCommentByIdRepo(commentId);

    if (getComment.error) {
        res.status(500).json(baseResponse(500, getComment.error.message, null));
        return
    }

    if (getComment.data.length === 0) {
        res.status(404).json(baseResponse(404, "Data not found!", null));
        return
    }

    const { data, error } = await deleteCommentRepo(commentId);
    if (error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, 'Delete Comment Success', data)); 
    }
}