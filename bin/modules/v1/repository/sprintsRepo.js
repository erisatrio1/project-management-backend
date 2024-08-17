import Sprints from '../../../infra/MySQL/Sprints.js';
import Project from "../../../infra/MySQL/Project.js";
import { dbResult } from '../../../utils/Response.js';
import { Op } from 'sequelize';

export const getSprintsRepo = async(projectId) => {
    try {
        const response = await Sprints.findAll({
            attributes: ['uuid', 'name', 'goal', 'start_date', 'end_date', 'projectId'],
            where: {
                projectId: projectId,
            },
            include: [{
                model: Project,
                as: 'projects',
                attributes: ['project_code', 'name']
            }]
        })
        return dbResult(response, null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}

export const getSprintByIdRepo = async(id) => {
    try {
        const sprint = await Sprints.findOne({
            attributes: ['id', 'uuid', 'name', 'goal', 'start_date', 'end_date', 'projectId'],
            where: {
                uuid: id
            }
        })

        const response = await Sprints.findByPk(sprint.id, {
            attributes: ['id', 'uuid', 'name', 'goal', 'start_date', 'end_date', 'projectId'],
            include: [{
                model: Project,
                as: 'projects',
                attributes: ['project_code', 'name']
            }]
        })
        return dbResult(response, null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}

export const createSprintRepo = async(projectId, payload) => {
    try {
        await Sprints.create({
            name: payload.name,
            goal: payload.goal,
            start_date: payload.start_date,
            end_date: payload.end_date,
            projectId: projectId
        });
        return dbResult(payload, null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}

export const updateSprintRepo = async(id, payload) => {
    try {
        const sprint = await Sprints.findOne({
            where: {
                uuid: id
            }
        });
        await Sprints.update({
            name: payload.name,
            goal: payload.goal,
            start_date: payload.start_date,
            end_date: payload.end_date,
        }, {
            where: {
                id: sprint.id
            }
        })
        const response = {
            name: payload.name,
            goal: payload.goal,
            start_date: payload.start_date,
            end_date: payload.end_date,
        }
        return dbResult(response, null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}

export const deleteSprintRepo = async(id) => {
    try {
        const sprint = await Sprints.findOne({
            where: {
                uuid: id
            }
        });
        await Sprints.destroy({
            where: {
                id: sprint.id
            }
        })
        return dbResult("Sprint has been deleted", null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}