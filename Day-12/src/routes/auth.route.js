import express from 'express';
const userModel = require('../models/user.model')

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.create({
        
    })
});

export default router;