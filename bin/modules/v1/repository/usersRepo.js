import User from "../../../infra/MySQL/User.js";
import Project from "../../../infra/MySQL/Project.js";
import { dbResult } from "../../../utils/Response.js";
import argon2 from 'argon2';


export const getUsersRepo = async() => {
    try {
        const users = await User.findAll({
            attributes: ['uuid', 'username', 'email', 'role']
        })
        return dbResult(users, null)
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}

export const getUserProjectsRepo = async(userId) => {
    try {
        const response = await User.findByPk(userId, {
            attributes: ['uuid', 'username', 'email', 'role'],
            include: {
                model: Project,
                as: "projects",
                attributes: ['uuid', 'project_code', 'name', 'description', 'start_date', 'end_date'],
            }
        })
        return dbResult(response, null)
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}

export const getUserByIdRepo = async(id) => {
    try {
        const user = await User.findOne({
            attributes: ['uuid', 'username', 'email', 'role'],
            where: {
                uuid: id
            }
        })
        // if (!user) return dbResult(null, 'Data not found!');
        return dbResult(user, null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}

export const createUserRepo = async(payload) => {
    try {
        const hashPassword = await argon2.hash(payload.password);
        await User.create({
            username: payload.username,
            email: payload.email,
            password: hashPassword,
            // role: payload.role
        });
        return dbResult(payload, null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}

export const updateUsernameRepo = async(id, updatedUsername) => {
    try {
        const user = await User.findOne({
            where: {
                uuid: id
            }
        });
        // if (!user) return dbResult(user, null)
        await User.update({
            username: updatedUsername.username
        }, {
            where: {
                id: user.id
            }
        })
        return dbResult(updatedUsername.username, null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}

export const updateUserRoleRepo = async(id, updatedUserRole) => {
    try {
        const user = await User.findOne({
            where: {
                uuid: id
            }
        });
        await User.update({
            role: updatedUserRole
        }, {
            where: {
                id: user.id
            }
        })
        return dbResult(updatedUserRole, null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}

export const updateAccountRepo = async(id, updatedAccount) => {
    try {
        const user = await User.findOne({
            where: {
                uuid: id
            }
        });
        // if (!user) return dbResult(user, null);
        let hashPassword;
        if(updatedAccount.password === "" || updatedAccount.password === null) {
            hashPassword = user.password;
        } else {
            hashPassword = await argon2.hash(updatedAccount.password);
        }
        await User.update({
            email: updatedAccount.email,
            password: hashPassword,
        }, {
            where: {
                id: user.id
            }
        })
        const response = {
            email: updatedAccount.email,
            password: hashPassword,
        }
        return dbResult(response, null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}

export const deleteUserRepo = async(id) => {
    try {
        const user = await User.findOne({
            where: {
                uuid: id
            }
        });
        // if (!user) return dbResult(null, new Error('Cannot find user!'));
        await User.destroy({
            where: {
                id: user.id
            }
        })
        return dbResult("User has been deleted", null);
    } catch (error) {
        console.log("error", error.message);
        return dbResult(null, new Error('error query to database'))
    }
}