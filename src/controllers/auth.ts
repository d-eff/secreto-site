import { Request, Response } from 'express';
import db from '../db';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

async function login(req: Request, res: Response) {
    if (!req.body.email || !req.body.password) {
        res.json({ error: { message: 'missing fields' } });
    }

    const User = db.models.User;

    const users = await User.findAll({
        where: {
            email: req.body.email
        }
    });

    if (users.length === 0) {
        res.json({ error: { message: 'ah nope' } });
    }

    const foundUser = users[0];
    const isValid = await bcrypt.compare(req.body.password, foundUser.dataValues.passhash);
    if (!isValid) {
        res.json({ error: { message: 'ah nope' } });
    } else {
        // create session token
        try {
            const token = await createSession(foundUser.dataValues.id);
            console.log("token", token)
            res.cookie("sessionToken", token.dataValues.token);
            // success!
            res.json({ message: "yer frigging logged in" });
        } catch (e) {
            console.error(e);
            res.json({ error: { message: 'what' }})
        }
    }
}

async function createSession(userId: number) {
    const token = uuidv4();
    const Session = db.models.Session;
    
    const foundUser = await Session.update({ token }, {
        where: {
          userId
        }
    });

    if (foundUser[0] === 0) {
        try {
            return await Session.create({ token, userId });
        } catch (error) {
            return Promise.reject("error saving session");
        }
    } else {
        return Promise.resolve({ dataValues: { token }})
    }
}

async function logout(req: Request, res: Response) {
    if (!req.cookies.sessionToken) {
        res.json({ error: { message: "what" } });
    }
    const Session = db.models.Session;
    await Session.destroy({
        where: {
            token: req.cookies.sessionToken
        }
    });
    res.json({ message: "bye" });
}


export default { login, logout };