import User from "../../../infra/MySQL/User.js";
import { baseResponse } from "../../../utils/Response.js";

export const verifyUser = async(req, res, next) => {
    if(!req.session.userId) {
        return res.status(401).json(baseResponse(401, 'Please Login to your Account!', null))
    }

    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });

    if (!user) {
        res.status(404).json(baseResponse(404, 'User Not Found!', null));
    }

    req.userId = user.id;
    next();
}

export const adminOnly = async(req, res, next) => {
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });

    if (!user) {
        res.status(404).json(baseResponse(404, 'User Not Found!', null));
    }

    if (user.role === 'Admin') {
        res.status(404).json(baseResponse(403, 'Not Allowed!', null));
    }
    next();
}

export const productOwnerOnly = async(req, res, next) => {
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });

    if (!user) {
        res.status(404).json(baseResponse(404, 'User Not Found!', null));
    }

    if (user.role === 'Product Owner') {
        res.status(404).json(baseResponse(403, 'Not Allowed!', null));
    }
    next();
}