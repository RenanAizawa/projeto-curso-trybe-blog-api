const jwt = require('jsonwebtoken');
const userService = require('../services/User');
require('dotenv/config');

const secret = process.env.JWT_SECRET;

const newUserControler = async (req, res) => {
    const info = req.body;
    try {
        const data = await userService.newUser(info);
        const token = jwt.sign({ data }, secret);
        return res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const allUsers = async (req, res) => {
    try {
        const data = await userService.getAll();
        if (data) {
            // console.log('all users', data);
            return res.status(200).json(data);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const user = await userService.getById(req.params.id);
        // console.log('user no controler', user);
        if (!user) return res.status(404).json({ message: 'User does not exist' });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
  newUserControler,
  allUsers,
  getById,
};