import { Request, Response } from 'express';
import db from '../db';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

async function login(req, res, next) {
    try {
        if (!req.body.email || !req.body.password) {
            throw new Error("missing fields")
        }
        const User = db.models.User;
    
        const users = await User.findAll({
            where: {
                email: req.body.email
            }
        });
    
        if (users.length === 0) {
            throw new Error("ah nope");
        }
    
        const foundUser = users[0];
        const isValid = await bcrypt.compare(req.body.password, foundUser.dataValues.passhash);
        if (!isValid) {
            throw new Error("ah nope")
        } else {
            // create session token
            const token = await createSession(foundUser.dataValues.id);
            res.cookie("sessionToken", token.dataValues.token);
            // success!
            res.json({ message: "yer frigging logged in" });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
    
}

async function createSession(userId) {
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

async function checkToken(req, res, next) {
    try {
        if (!req.cookies.sessionToken) {
            throw new Error("missing or invalid session")
        }
        const token = req.cookies.sessionToken;
        const Session = db.models.Session;
        const sessions = await Session.findAll({
            where: {
                token
            }
        });
        if (sessions.length === 0) {
            throw new Error("missing or invalid session")
        }
        console.log("TOKEN GOOD")
        next();
    } catch (err) {
        return next(err);
    }
}

async function logout(req, res) {
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


export default { login, checkToken, logout };