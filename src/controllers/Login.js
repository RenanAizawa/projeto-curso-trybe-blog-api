const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const loginService = require('../services/Login');

dotenv.config();

const secret = process.env.JWT_SECRET;

const userByEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const data = await loginService.userByEmail(email);
        const token = jwt.sign({ data }, secret);

        return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};

module.exports = {
  userByEmail,
};