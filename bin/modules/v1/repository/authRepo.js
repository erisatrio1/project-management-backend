import User from "../../../infra/MySQL/User.js";
import argon2 from "argon2"
import { dbResult } from "../../../utils/Response.js"

export const LoginRepo = async(email, password) => {
    const user = await User.findOne({
        where: {
            email: email
        }
    });

    if (!user) return dbResult(null, 'User Not Found!');
    const match = await argon2.verify(user.password, password);
    if (!match) return dbResult(null, 'Password Not match!');
    const response = {
        uuid: user.uuid,
        username: user.username,
        email: user.email,
    }

    return dbResult(response, null);
}

export const MeRepo = async(id) => {
    const user = await User.findOne({
        where: {
            uuid: id
        }
    })
    if (!user) return dbResult(null, 'User Not Found!');
    const response = {
        uuid: user.uuid,
        username: user.username,
        email: user.email,
    }

    return dbResult(response, null);
}