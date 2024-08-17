import { baseResponse } from "../../../utils/Response.js";
import { getStoriesRepo, getStoryByIdRepo, createStoryRepo, updateStoryRepo, deleteStoryRepo} from "../repository/storiesRepo.js"
import { CreateStory } from '../../../entity/Create.js';

export const getStories = async(req, res) => {
    const sprintId = req.query.sprintId;
    const { data, error } = await getStoriesRepo(sprintId)
    if (data.length === 0) return res.status(404).json(baseResponse(404, 'Data Not found!', null));
    if(error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, null, data));
    }
}

export const getStorytById = async(req, res) => {
    const { data, error } = await getStoryByIdRepo(req.params.id)
    if (data.length === 0) return res.status(404).json(baseResponse(404, 'Data Not found!', null));
    if(error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, null, data));
    }
}

export const createStory = async(req, res) => {
    const sprintId = req.query.sprintId
    const payload = req.body;
    const newStory = CreateStory(payload);
    const { data, error } = await createStoryRepo(sprintId, newStory);
    if (error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, 'Create Story Success', data));   
    }
}

export const updateStory = async(req, res) => {
    const storyId = req.params.id;
    const payload = req.body;
    const newStory = CreateStory(payload);

    if (storyId === undefined ) {
        res.status(404).json(baseResponse(404, "Data not found!", null));
    }

    const getStory = await getStoryByIdRepo(storyId);

    if (getStory.error) {
        res.status(500).json(baseResponse(500, getStory.error.message, null));
        return
    }

    if (getStory.data.length === 0) {
        res.status(404).json(baseResponse(404, "Data not found!", null));
        return
    }

    const { data, error } = await updateStoryRepo(storyId, newStory);
    if (error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, 'Update Story Success', data));   
    }
}

export const deleteStory = async(req, res) => {
    const storyId = req.params.id;

    if (storyId === undefined ) {
        res.status(404).json(baseResponse(404, "Data not found!", null));
    }

    const getStory = await getStoryByIdRepo(storyId);

    if (getStory.error) {
        res.status(500).json(baseResponse(500, getStory.error.message, null));
        return
    }

    if (getStory.data.length === 0) {
        res.status(404).json(baseResponse(404, "Data not found!", null));
        return
    }

    const { data, error } = await deleteStoryRepo(storyId);
    if (error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, 'Delete Story Success', data)); 
    }
}