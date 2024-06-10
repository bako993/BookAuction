import userData from '../data/users.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findHighestId , isIdNumeric } from "../helpers/id_info.js";
import httpStatus from "http-status-codes";
import {validateInputs} from "../helpers/validation.js";
import dotenv from "dotenv";
dotenv.config();
let users = userData;

export function getUsers (req,res) {
    res.json(users);
}
export function getUser (req,res) {
    const found = users.some(user => user.id === parseInt(req.params.id))
    if (!isIdNumeric(parseInt(req.params.id))) {
        return res.status(httpStatus.BAD_REQUEST).send('Id must be numeric')
    }
    if (found) {
        res.status(httpStatus.OK).json(users.filter(user => user.id === parseInt(req.params.id)))
    }else {
        res.status(httpStatus.NOT_FOUND).send(`User with id ${req.params.id} does not exist`)
    }
}
export async function createUser (req,res) {

    try {
        const validateError = validateInputs(req.body.password, req.body.email);
        if (validateError) {
            return res.status(httpStatus.BAD_REQUEST).send(validateError);
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = {
            id: findHighestId(users) +1,
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            isAdmin: req.body.isAdmin,
            bidding: [],
        }
        if (!newUser.name || !newUser.email) {
            return res.status(httpStatus.BAD_REQUEST).send('Required information is missing')
        }

        const existingUser = users.find(user => user.email === newUser.email);
        if (existingUser) {
            return res.status(httpStatus.BAD_REQUEST).send('Email is already taken.')
        }

        const token = jwt.sign({
            id: newUser.id,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            password: newUser.password
        }, process.env.ACCESS_TOKEN_SECRET);
        res.status(httpStatus.CREATED).json({
            message: "User created an account successfully",
            accessToken: token,
            user: newUser
        });
        users.push(newUser);

    }catch {
        res.status(httpStatus.BAD_REQUEST).send('Can not create an account without password')
    }
}
export async function loginUser (req,res) {
    const user = users.find(u => u.email === req.body.email)
    if (user == null) {
        return res.status(httpStatus.NOT_FOUND).send('Cannot find user with the given email')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                isAdmin: user.isAdmin,
                password: user.password
            }, process.env.ACCESS_TOKEN_SECRET);
            res.status(httpStatus.ACCEPTED).json({
                message: "User logged in successfully",
                accessToken: token,
                user: user
            });
        }else {
            res.status(httpStatus.UNAUTHORIZED).send('Password is incorrect')
        }
    }catch {
        res.status(httpStatus.NOT_IMPLEMENTED).send('Please provide the password to login')
    }
}
export function updateUserInfo (req,res) {
    const found = users.some(user => user.id === parseInt(req.params.id))
    if (!isIdNumeric(parseInt(req.params.id))) {
        return res.status(httpStatus.BAD_REQUEST).send('Id must be numeric')
    }
    if (found) {
        const updateUser = req.body;

        const existingUser = users.find(user => user.email === updateUser.email);
        if (existingUser) {
            return res.status(httpStatus.BAD_REQUEST).send('Email is already taken. Please provide a different email.')
        }
        users.forEach(user => {
            if (user.id === parseInt(req.params.id)) {
                user.name = updateUser.name ? updateUser.name: user.name
                user.email = updateUser.email ? updateUser.email: user.email
                user.isAdmin = updateUser.isAdmin ? updateUser.isAdmin: user.isAdmin
                res.status(httpStatus.OK).json({
                    message: 'User has been updated',
                    user})
            }
        })
    } else {
        res.status(httpStatus.NOT_FOUND).send(`User with id ${req.params.id} does not exist`)
    }
}
export function deleteUser(req,res) {
    const found = users.some(user => user.id === parseInt(req.params.id));

    if (!isIdNumeric(parseInt(req.params.id))) {
        return res.status(httpStatus.BAD_REQUEST).send('Id must be numeric')
    }
    if (found) {
        users = users.filter(user => user.id !== parseInt(req.params.id));
        res.status(httpStatus.OK).json({
            msg: `User with id ${req.params.id} has been deleted`,
            users,
        });
    }else {
        res.status(httpStatus.NOT_FOUND).send(`User with id ${req.params.id} does not exist`)
    }
}


