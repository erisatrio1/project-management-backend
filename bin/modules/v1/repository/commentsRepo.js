import Comments from '../../../infra/MySQL/Comments.js'
import { dbResult } from '../../../utils/Response.js'

export const getCommentsRepo = async(storyId) => {
    try {
        const response = await Comments.findAll({
            attributes: ['uuid', 'comment', 'storyId', 'userId'],
            where: {
                storyId: storyId,
            },
            include: [{
                model: Stories,
                as: "stories",
                attributes: ['title']
            }]
        })
        return dbResult(response, null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}

export const getCommentByIdRepo = async(id) => {
    try {
        const comment = await Comments.findOne({
            attributes: ['id', 'uuid', 'comment', 'storyId', 'userId'],
            where: {
                uuid: id
            }
        })

        const response = await Comments.findByPk(comment.id, {
            attributes: ['id', 'uuid', 'comment', 'storyId', 'userId'],
            include: [{
                model: Stories,
                as: "stories",
                attributes: ['title']
            }, {
                model: Users,
                as: "users",
                attributes: ['name', 'email']
            }]
        })
        return dbResult(response, null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}

export const createCommentRepo = async(storyId, userId, payload) => {
    try {
        await Stories.create({
            comment: payload.comment,
            userStoryId: storyId,
            userId: userId
        });
        return dbResult(payload, null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}

export const updateCommentRepo = async(id, payload) => {
    try {
        const comment = await Comments.findOne({
            where: {
                uuid: id
            }
        });
        await Comments.update({
            comment: payload.comment,
        }, {
            where: {
                id: comment.id
            }
        })
        const response = {
            comment: payload.comment,
        }
        return dbResult(response, null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}

export const deleteCommentRepo = async(id) => {
    try {
        const comment = await Comments.findOne({
            where: {
                uuid: id
            }
        });
        await Comments.destroy({
            where: {
                id: comment.id
            }
        })
        return dbResult("Comment has been deleted", null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}