import { LoginRepo, MeRepo } from "../repository/authRepo.js"
import { baseResponse } from "../../../utils/Response.js";

export const Login = async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const { data, error } = await LoginRepo(email, password);

    if (error === 'User Not Found!') {
        res.status(404).json(baseResponse(404, 'User Not Found!', null));
    }

    if (error === 'Password Not match!') {
        res.status(404).json(baseResponse(404, 'Password Not match!', null));
    }

    req.session.userId = data.uuid; 

    res.status(200).json(baseResponse(200, "Login Success!", data));
}

export const Me = async(req, res) => {
    const userId = req.session.userId

    if (!userId) return res.status(401).json(baseResponse(401, 'Please Login to your Account!', null))

    const { data, error } = await MeRepo(userId);

    if (error === 'User Not Found!') {
        res.status(404).json(baseResponse(404, 'User Not Found!', null));
    }

    res.status(200).json(baseResponse(200, `You are using ${data.username}`, data));
}

export const logOut = async(req, res) => {
    req.session.destroy((error) => {
        if (error) res.status(400).json(baseResponse(401, 'Logout not Allowed!', null))
        res.status(200).json(baseResponse(200, "Logout Success!", null));
    })
}