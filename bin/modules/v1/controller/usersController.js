import { getUsersRepo, getUserProjectsRepo, getUserByIdRepo, createUserRepo, updateUsernameRepo, updateUserRoleRepo, updateAccountRepo, deleteUserRepo } from "../repository/usersRepo.js";
import { CreateUser } from "../../../entity/Create.js";
import { baseResponse } from "../../../utils/Response.js";

export const getUsers = async(req, res) => {
    const { data, error } = await getUsersRepo()
    if (data.length === 0) return res.status(404).json(baseResponse(404, 'Data Not found!', null));
    if(error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, null, data));
    }

}

export const getUserProjects = async(req, res) => {
    const { data, error } = await getUserProjectsRepo(req.userId);
    if (data.length === 0) return res.status(404).json(baseResponse(404, 'Data Not found!', null)); 
    if(error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, null, data));
    }
}

export const getUserById = async(req, res) => {
    const { data, error } = await getUserByIdRepo(req.params.id)
    if (data.length === 0) return res.status(404).json(baseResponse(404, 'Data Not found!', null));
    if(error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, null, data));
    }
}

export const createUser = async(req, res) => {
    const { password, confPassword } = req.body;
    if(password !== confPassword ) return res.status(400).json(baseResponse(400, 'Password and Confirm Password not match!', null));
    const payload = req.body;
    const newUser = CreateUser(payload);
    const {data, error} = await createUserRepo(newUser);
    if (error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(201).json(baseResponse(201, 'Create User Success', data));   
    }
}

export const updateUsername = async(req, res) => {
    const userId = req.params.id;
    const payload = req.body;
    const newUsername = CreateUser(payload);

    if (userId === undefined ) {
        res.status(404).json(baseResponse(404, "Data not found!", null));
    }

    const getUser = await getUserByIdRepo(userId);

    if (getUser.error) {
        res.status(500).json(baseResponse(500, getUser.error.message, null));
        return
    }

    if (getUser.data.length === 0) {
        res.status(404).json(baseResponse(404, "Data not found!", null));
        return
    }

    const { data, error } = await updateUsernameRepo(userId, newUsername);
    // if (data.length === 0) return res.status(404).json(baseResponse(404, 'Data Not found!', null));
    if (error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, 'Update Username Success', data));   
    }
}

export const updateUserRole = async(req, res) => {
    const userId = req.params.id;
    const payload = req.body.role;

    if (userId === undefined ) {
        res.status(404).json(baseResponse(404, "Data not found!", null));
    }

    const getUser = await getUserByIdRepo(userId);

    if (getUser.error) {
        res.status(500).json(baseResponse(500, getUser.error.message, null));
        return
    }

    if (getUser.data.length === 0) {
        res.status(404).json(baseResponse(404, "Data not found!", null));
        return
    }

    const { data, error } = await updateUserRoleRepo(userId, payload);
    if (error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, 'Update Username Success', data));   
    }
}

export const updateAccount = async(req, res) => {
    const userId = req.params.id;
    const payload = req.body;
    const newAccount = CreateUser(payload);

    if (userId === undefined ) {
        res.status(404).json(baseResponse(404, "Data not found!", null));
    }

    const getUser = await getUserByIdRepo(userId);

    if (getUser.error) {
        res.status(500).json(baseResponse(500, getUser.error.message, null));
        return
    }

    if (getUser.data.length === 0) {
        res.status(404).json(baseResponse(404, "Data not found!", null));
        return
    }

    const { data, error } = await updateAccountRepo(userId, newAccount);
    // if (data.length === 0) return res.status(404).json(baseResponse(404, 'Data Not found!', null));
    if (error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, 'Update Account Success', data));   
    }
}

export const deleteUser = async(req, res) => {
    const userId = req.params.id;
    
    if (userId === undefined ) {
        res.status(404).json(baseResponse(404, "Data not found!", null));
    }

    const getUser = await getUserByIdRepo(userId);

    if (getUser.error) {
        res.status(500).json(baseResponse(500, getUser.error.messange, null));
        return
    }

    if (getUser.data.length === 0) {
        res.status(404).json(baseResponse(404, "Data not found!", null));
        return
    }

    const { data, error } = await deleteUserRepo(userId);
    if (error) {
        res.status(500).json(baseResponse(500, error, null));
    } else {
        res.status(200).json(baseResponse(200, 'Delete Account Success', data));   
    }
}