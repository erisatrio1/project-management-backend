import { baseResponse } from "../../../utils/Response.js";
import { getTasksRepo, getTaskByIdRepo, createTaskRepo, updateTaskRepo, deleteTaskRepo } from "../repository/tasksRepo.js"
import { CreateTask } from '../../../entity/Create.js';

export const getTasks = async(req, res) => {
    const storyId = req.query.storyId;
    const { data, error } = await getTasksRepo(storyId)
    if (data.length === 0) return res.status(404).json(baseResponse(404, 'Data Not found!', null));
    if(error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, null, data));
    }
}

export const getTaskById = async(req, res) => {
    const { data, error } = await getTaskByIdRepo(req.params.id)
    if (data.length === 0) return res.status(404).json(baseResponse(404, 'Data Not found!', null));
    if(error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, null, data));
    }
}

export const createTask = async(req, res) => {
    const storyId = req.query.storyId
    const payload = req.body;
    const newTask = CreateTask(payload);
    const { data, error } = await createTaskRepo(storyId, newTask);
    if (error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, 'Create Task Success', data));   
    }
}

export const updateTask = async(req, res) => {
    const taskId = req.params.id;
    const payload = req.body;
    const newTask = CreateTask(payload);

    if (taskId === undefined ) {
        res.status(404).json(baseResponse(404, "Data not found!", null));
    }

    const getTask = await getTaskByIdRepo(taskId);

    if (getTask.error) {
        res.status(500).json(baseResponse(500, getTask.error.message, null));
        return
    }

    if (getTask.data.length === 0) {
        res.status(404).json(baseResponse(404, "Data not found!", null));
        return
    }

    const { data, error } = await updateTaskRepo(taskId, newTask);
    if (error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, 'Update Task Success', data));   
    }
}

export const deleteTask = async(req, res) => {
    const taskId = req.params.id;

    if (taskId === undefined ) {
        res.status(404).json(baseResponse(404, "Data not found!", null));
    }

    const getTask = await getTaskByIdRepo(taskId);

    if (getTask.error) {
        res.status(500).json(baseResponse(500, getTask.error.message, null));
        return
    }

    if (getTask.data.length === 0) {
        res.status(404).json(baseResponse(404, "Data not found!", null));
        return
    }

    const { data, error } = await deleteTaskRepo(taskId);
    if (error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, 'Delete Task Success', data)); 
    }
}