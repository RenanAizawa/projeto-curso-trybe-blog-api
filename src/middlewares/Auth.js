const jwt = require('jsonwebtoken');
require('dotenv/config');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;

const authValidate = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) return res.status(401).json({ message: 'Token not found' });
        const decode = jwt.verify(token, secret);
        const user = await User.findOne({ where: { email: decode.newData.email } });
        if (!user) return res.status(401).json({ message: 'Expired or invalid token' });
        if (user) {
            req.user = user;
            next();
        }
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = authValidate;