import Stories from '../../../infra/MySQL/Stories.js'
import Sprints from '../../../infra/MySQL/Sprints.js'
import { dbResult } from '../../../utils/Response.js'

export const getStoriesRepo = async(sprintId) => {
    try {
        const response = await Stories.findAll({
            attributes: ['uuid', 'title', 'description', 'priority', 'status', 'sprintId'],
            where: {
                sprintId: sprintId,
            },
            include: [{
                model: Sprints,
                as: "sprints",
                attributes: ['name']
            }]
        })
        return dbResult(response, null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}

export const getStoryByIdRepo = async(id) => {
    try {
        const story = await Stories.findOne({
            attributes: ['id', 'uuid', 'title', 'description', 'priority', 'status', 'sprintId'],
            where: {
                uuid: id
            }
        })

        const response = await Stories.findByPk(story.id, {
            attributes: ['id', 'uuid', 'title', 'description', 'priority', 'status', 'sprintId'],
            include: [{
                model: Sprints,
                as: 'sprints',
                attributes: ['name']
            }]
        })
        return dbResult(response, null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}

export const createStoryRepo = async(sprintId, payload) => {
    try {
        await Stories.create({
            title: payload.title,
            description: payload.description,
            priority: payload.priority,
            status: payload.status,
            sprintId: sprintId
        });
        return dbResult(payload, null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}

export const updateStoryRepo = async(id, payload) => {
    try {
        const story = await Stories.findOne({
            where: {
                uuid: id
            }
        });
        await Stories.update({
            title: payload.title,
            description: payload.description,
            priority: payload.priority,
            status: payload.status,
        }, {
            where: {
                id: story.id
            }
        })
        const response = {
            title: payload.title,
            description: payload.description,
            priority: payload.priority,
            status: payload.status,
        }
        return dbResult(response, null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}

export const deleteStoryRepo = async(id) => {
    try {
        const story = await Stories.findOne({
            where: {
                uuid: id
            }
        });
        await Stories.destroy({
            where: {
                id: story.id
            }
        })
        return dbResult("Story has been deleted", null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}