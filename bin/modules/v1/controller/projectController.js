import { baseResponse } from "../../../utils/Response.js";
import { joinProjectRepo, getProjectsRepo, getProjectByIdRepo, createProjectRepo, updateProjectRepo, deleteProjectRepo } from "../repository/projectsRepo.js";
import { CreateProject } from '../../../entity/Create.js';

export const joinProject = async(req, res) => {
    const projectCode = req.query.code;
    const userId = req.userId
    const { data, error } = await joinProjectRepo(projectCode, userId);
    if (error === 'Project not found') {
        res.status(500).json(baseResponse(500, 'Project not found', null));
        return
    }

    if (error === 'User not found') {
        res.status(500).json(baseResponse(500, 'User not found', null));
        return
    }
    // if (data.length === 0) return res.status(404).json(baseResponse(404, 'Data Not found!', null));
    if(error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, 'Success added new project!', data));
    }
}

export const getProjects = async(req, res) => {
    if (req.role === 'Admin') {
        const { data, error } = await getProjectsRepo()
        if (data.length === 0) return res.status(404).json(baseResponse(404, 'Data Not found!', null));
        if(error) {
            res.status(500).json(baseResponse(500, error, null));
        } else {
            res.status(200).json(baseResponse(200, null, data));
        }
    } else {
        res.status(405).json(baseResponse(500, "You are Not Allowed!", null));
    }
}

export const getProjectById = async(req, res) => {
    const { data, error } = await getProjectByIdRepo(req.params.id)
    if (data.length === 0) return res.status(404).json(baseResponse(404, 'Data Not found!', null));
    if(error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        // req.session.projectId = data.id;
        res.status(200).json(baseResponse(200, null, data));
    }
}

export const createProject = async(req, res) => {
    const payload = req.body;
    const newProject = CreateProject(payload);
    const userId = req.userId
    const { data, error } = await createProjectRepo(userId, newProject);
    if (error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, 'Create Project Success', data));   
    }
}

export const updateProject = async(req, res) => {
    const projectId = req.params.id;
    const payload = req.body;
    const newProject = CreateProject(payload);

    if (projectId === undefined ) {
        res.status(404).json(baseResponse(404, "Data not found!", null));
    }

    const getProject = await getProjectByIdRepo(projectId);

    if (getProject.error) {
        res.status(500).json(baseResponse(500, getProject.error.message, null));
        return
    }

    if (getProject.data.length === 0) {
        res.status(404).json(baseResponse(404, "Data not found!", null));
        return
    }

    const { data, error } = await updateProjectRepo(projectId, newProject);
    if (error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, 'Update Project Success', data));   
    }
}

export const deleteProject = async(req, res) => {
    const projectId = req.params.id;

    if (projectId === undefined ) {
        res.status(404).json(baseResponse(404, "Data not found!", null));
    }

    const getProject = await getProjectByIdRepo(projectId);

    if (getProject.error) {
        res.status(500).json(baseResponse(500, getProject.error.message, null));
        return
    }

    if (getProject.data.length === 0) {
        res.status(404).json(baseResponse(404, "Data not found!", null));
        return
    }

    const { data, error } = await deleteProjectRepo(projectId);
    if (error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, 'Delete Project Success', data)); 
    }
}