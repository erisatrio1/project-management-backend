import { baseResponse } from "../../../utils/Response.js";
import { getSprintsRepo, getSprintByIdRepo, createSprintRepo, updateSprintRepo, deleteSprintRepo } from "../repository/sprintsRepo.js";
import { CreateSprint } from '../../../entity/Create.js';

export const getSprints = async(req, res) => {
    const projectId = req.query.projectId;
    const { data, error } = await getSprintsRepo(projectId)
    if (data.length === 0) return res.status(404).json(baseResponse(404, 'Data Not found!', null));
    if(error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, null, data));
    }
}

export const getSprintById = async(req, res) => {
    const { data, error } = await getSprintByIdRepo(req.params.id)
    if (data.length === 0) return res.status(404).json(baseResponse(404, 'Data Not found!', null));
    if(error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, null, data));
    }
}

export const createSprint = async(req, res) => {
    const projectId = req.query.projectId
    const payload = req.body;
    const newSprint = CreateSprint(payload);
    const { data, error } = await createSprintRepo(projectId, newSprint);
    if (error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, 'Create Sprint Success', data));   
    }
}

export const updateSprint = async(req, res) => {
    const sprintId = req.params.id;
    const payload = req.body;
    const newSprint = CreateSprint(payload);

    if (sprintId === undefined ) {
        res.status(404).json(baseResponse(404, "Data not found!", null));
    }

    const getSprint = await getSprintByIdRepo(sprintId);

    if (getSprint.error) {
        res.status(500).json(baseResponse(500, getSprint.error.message, null));
        return
    }

    if (getSprint.data.length === 0) {
        res.status(404).json(baseResponse(404, "Data not found!", null));
        return
    }

    const { data, error } = await updateSprintRepo(sprintId, newSprint);
    if (error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, 'Update Sprint Success', data));   
    }
}

export const deleteSprint = async(req, res) => {
    const sprintId = req.params.id;

    if (sprintId === undefined ) {
        res.status(404).json(baseResponse(404, "Data not found!", null));
    }

    const getSprint = await getSprintByIdRepo(sprintId);

    if (getSprint.error) {
        res.status(500).json(baseResponse(500, getSprint.error.message, null));
        return
    }

    if (getSprint.data.length === 0) {
        res.status(404).json(baseResponse(404, "Data not found!", null));
        return
    }

    const { data, error } = await deleteSprintRepo(sprintId);
    if (error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, 'Delete Sprint Success', data)); 
    }
}