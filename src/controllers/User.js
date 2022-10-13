const jwt = require('jsonwebtoken');
const userService = require('../services/User');
require('dotenv/config');

const secret = process.env.JWT_SECRET;

const newUserControler = async (req, res) => {
    const data = req.body;
    try {
        const newData = await userService.newUser(data);
        const token = jwt.sign({ newData }, secret);
        return res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
  newUserControler,
};