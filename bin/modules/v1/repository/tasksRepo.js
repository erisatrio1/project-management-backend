import Tasks from "../../../infra/MySQL/Tasks.js";
import Stories from "../../../infra/MySQL/Stories.js";
import User from "../../../infra/MySQL/User.js";
import { dbResult } from "../../../utils/Response.js";

export const getTasksRepo = async(storyId) => {
    try {
        const response = await Tasks.findAll({
            attributes: ['uuid', 'title', 'description', 'status', 'userStoryId', 'assigneeId'],
            where: {
                userStoryId: storyId,
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

export const getTaskByIdRepo = async(id) => {
    try {
        const task = await Tasks.findOne({
            attributes: ['id', 'uuid', 'title', 'description', 'status', 'userStoryId', 'assigneeId'],
            where: {
                uuid: id
            }
        })

        const response = await Tasks.findByPk(task.id, {
            attributes: ['id', 'uuid', 'title', 'description', 'status', 'userStoryId', 'assigneeId'],
            include: [{
                model: Stories,
                as: "stories",
                attributes: ['title']
            }, {
                model: User,
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

export const createTaskRepo = async(storyId, payload) => {
    try {
        await Stories.create({
            title: payload.title,
            description: payload.description,
            status: payload.status,
            userStoryId: storyId,
            assigneeId: payload.assigneeId
        });
        return dbResult(payload, null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}

export const updateTaskRepo = async(id, payload) => {
    try {
        const task = await Tasks.findOne({
            where: {
                uuid: id
            }
        });
        await Tasks.update({
            title: payload.title,
            description: payload.description,
            status: payload.status,
            userStoryId: storyId,
            assigneeId: payload.assigneeId
        }, {
            where: {
                id: task.id
            }
        })
        const response = {
            title: payload.title,
            description: payload.description,
            status: payload.status,
            userStoryId: storyId,
            assigneeId: payload.assigneeId
        }
        return dbResult(response, null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}

export const deleteTaskRepo = async(id) => {
    try {
        const task = await Tasks.findOne({
            where: {
                uuid: id
            }
        });
        await Tasks.destroy({
            where: {
                id: task.id
            }
        })
        return dbResult("Task has been deleted", null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}