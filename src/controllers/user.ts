import { Request, Response } from 'express';
import db from '../db';
import bcrypt from 'bcrypt';

async function createUser (req: Request, res: Response) {
    const User = db.models.User;
    const hash = await bcrypt.hash(req.body.password, 4);
    const createdUser = await User.create({ email: req.body.email, passhash: hash });
    res.json(createdUser)
}

async function getUser (req: Request, res: Response) {
    const User = db.models.User;
    const foundUser = await User.findAll({
        where: {
            id: req.params.userId
        }
    });
    res.json(foundUser);
}

function editUser (req: Request, res: Response) {
    console.log(req.params.userId);
}

function deleteUser (req: Request, res: Response) {
    console.log(req.params.userId);
}

export default { createUser, getUser, editUser, deleteUser };