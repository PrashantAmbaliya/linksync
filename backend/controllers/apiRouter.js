const express = require('express')
const userModel = require('../models/userModel')
const { createJWT, verifyJWT } = require('../auth/jwtAuth')

const apiRouter = express.Router();


apiRouter.post('/api/register', async (req, res) => {
    const { handle, email, password, username } = req.body;

    try {
        const Result = await userModel.create({ handle, email, password, username })
        return res.status(200).json({ email, status: 200 })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

apiRouter.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const Result = await userModel.findOne({ email: email });
        if (!Result) { return res.status(401).json({ error: 'Invalid email or password' }); }
        if (Result.password !== password) { return res.status(401).json({ error: 'Invalid email or password' }); }

        const Token = createJWT({ email })

        return res.status(200).json({ Token, email: Result.email, status: 200 });
    } catch (error) {
        return res.status(400)
    }
})

apiRouter.post('/data/dashbord', async (req, res) => {
    const { Token } = req.body;
    try {
        const { email } = verifyJWT(Token)
        const Result = await userModel.findOne({ email: email })

        const UserData = {
            handle: Result.handle,
            username: Result.username,
            bio: Result.bio,
            avatar: Result.avatar,
            links: Result.links,
            socialMedia: Result.socialMedia
        }

        res.status(200).json({ data: UserData, status: 200 })
    } catch (error) {
        return res.status(400).json({ messgae: error.message })
    }
})

apiRouter.get('/get/:handle', async (req, res) => {
    const handle = req.params.handle;
    try {
        const Result = await userModel.findOne({ handle })

        if (!Result) {
            return res.status(404).json({ message: "Handle Not Found" })
        }

        const HandleData = {
            avatar: Result.avatar,
            handle: Result.handle,
            links: Result.links,
            bio: Result.bio,
            socialMedia: Result.socialMedia
        }

        res.status(200).json({ data: HandleData })
    } catch (error) {
        res.status(404)
    }
})

apiRouter.patch("/edit/profile", async (req, res) => {
    const { Token, username, bio, avatar } = req.body;
    try {
        const { email } = verifyJWT(Token)
        const Result = await userModel.findOneAndUpdate(
            { email },
            { $set: { username, bio, avatar } },
            { new: true }
        )

        if (!Result) {
            return res.status(404).json({ message: "User not found" });
        }

        const userData = {
            avatar: Result.avatar,
            handle: Result.handle,
            links: Result.links,
            bio: Result.bio,
            username: Result.username,
            socialMedia: Result.socialMedia
        }

        res.status(200).json({ data: userData, message: "Profile updated successfully" });
    } catch (error) {
        res.status(404)
    }
})


apiRouter.patch("/edit/socialmedia", async (req, res) => {
    const { Token, socialMedia } = req.body;
    try {
        const { email } = verifyJWT(Token)
        const Result = await userModel.findOneAndUpdate(
            { email },
            { $set: { socialMedia: socialMedia } },
            { new: true }
        )

        if (!Result) {
            return res.status(404).json({ message: "User not found" });
        }

        const userData = {
            avatar: Result.avatar,
            handle: Result.handle,
            links: Result.links,
            bio: Result.bio,
            username: Result.username,
            socialMedia: Result.socialMedia
        }

        res.status(200).json({ data: userData, message: "Social Media updated successfully" });
    } catch (error) {
        res.status(404)
    }
})

apiRouter.patch('/edit/links', async (req, res) => {
    const { Token, links } = req.body
    try {
        const { email } = verifyJWT(Token);

        const Result = await userModel.findOneAndUpdate(
            { email: email },
            { $set: { links: links } },
            { new: true }
        );

        if (!Result) {
            return res.status(404).json({ message: "User not found" });
        }
        const userData = {
            avatar: Result.avatar,
            handle: Result.handle,
            links: Result.links,
            bio: Result.bio,
            username: Result.username,
            socialMedia: Result.socialMedia
        }

        res.status(200).json({ data: userData, message: "Links updated successfully" });
    } catch (error) {
        res.status(404)
    }
})

module.exports = apiRouter;