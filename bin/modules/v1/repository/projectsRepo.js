import Project from "../../../infra/MySQL/Project.js";
import Sprints from "../../../infra/MySQL/Sprints.js"
import User from "../../../infra/MySQL/User.js";
import { dbResult } from "../../../utils/Response.js";

// const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// const characters ='abcdefghijklmnopqrstuvwxyz';

// function generateProjectCode(length) {
//     let result = ' ';
//     const charactersLength = characters.length;
//     for ( let i = 0; i < length; i++ ) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }

//     return result;
// }

function generateProjectCode() {
    return Math.random().toString(36).substr(2, 8);
}

export const joinProjectRepo = async(projectCode, userId) => {
    try {
        const project = await Project.findOne({
            where: {
                project_code: projectCode
            }
        })

        if (!project) {
            console.log("Project not found for code:", projectCode);
            return dbResult(null,'Project not found');
        }

        const user = await User.findByPk(userId,{
        })

        if (!user) {
            console.log("User not found for code:", userId);
            return dbResult(null,'User not found');
        }

        const response = await project.addUser(user);

        return dbResult(response, null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}

export const getProjectsRepo = async() => {
    try {
        const response = await Project.findAll({
            attributes: ['uuid', 'project_code', 'name', 'description', 'start_date', 'end_date'],
        })
        return dbResult(response, null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}

export const getProjectByIdRepo = async(id) => {
    try {
        const project = await Project.findOne({
            attributes: ['id', 'uuid', 'project_code', 'name', 'description', 'start_date', 'end_date'],
            where: {
                uuid: id
            }
        })

        const response = await Project.findByPk(project.id, {
            attributes: ['id', 'uuid', 'project_code', 'name', 'description', 'start_date', 'end_date'],
            include: [{
                model: User,
                as: "users",
                attributes: ['id', 'uuid', 'username', 'email', 'role'],
            }],
            // include: [{
            //     model: Sprints,
            //     as: "sprints",
            //     attributes: ['uuid', 'name', 'goal', 'start_date', 'end_date', 'project_id'],
            // }, {
            //     model: User,
            //     as: "users",
            //     attributes: ['uuid', 'username', 'email', 'role'],
            // }]
        })
        return dbResult(response, null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}

export const createProjectRepo = async(userId, payload) => {
    // const projectCode = generateProjectCode(8);
    const projectCode = generateProjectCode();
    try {
        const response = await Project.create({
            project_code: projectCode,
            name: payload.name,
            description: payload.description,
            start_date: payload.start_date,
            end_date: payload.end_date
        });
        await User.update({
            role: 'Product Owner'
        }, {
            where:{
                id: userId
            }
        })

        const user = await User.findByPk(userId,{
        })

        const project = await Project.findByPk(response.id,{
        })

        if (!project) {
            console.log("Project not found for id:", response.id);
            return dbResult(null,'Project not found');
        }

        await project.addUser(user);
        return dbResult(response, null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}

export const updateProjectRepo = async(id, payload) => {
    try {
        const project = await Project.findOne({
            where: {
                uuid: id
            }
        });
        await Project.update({
            name: payload.name,
            description: payload.description,
            start_date: payload.start_date,
            end_date: payload.end_date
        }, {
            where: {
                id: project.id
            }
        })
        const response = {
            name: payload.name,
            description: payload.description,
            start_date: payload.start_date,
            end_date: payload.end_date
        }
        return dbResult(response, null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}

export const deleteProjectRepo = async(id) => {
    try {
        const project = await Project.findOne({
            where: {
                uuid: id
            }
        });
        await Project.destroy({
            where: {
                id: project.id
            }
        })
        return dbResult("Project has been deleted", null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}