const userService = require('../services/User');

const verifUser = async (data) => {
    const newData = await userService.newEmail(data.email);
    if (newData) return { code: 409, message: 'User already registered' };
    return null;
};

const verifPassword = async (data) => {
    if (data.password.length < 6) {
 return { code: 400,
        message: '"password" length must be at least 6 characters long' }; 
}
    return verifUser(data);
};

const verifEmail = async (data) => {
    const regex = /.*@.*\.com/i;
    if (!regex.test(data.email)) {
        return { code: 400, message: '"email" must be a valid email' };
    }
    return verifPassword(data);
};

const verifName = async (data) => {
    if (data.displayName.length < 8) {
      return { code: 400, message: '"displayName" length must be at least 8 characters long' };
    }
    return verifEmail(data);
};

const validador = (data) => verifName(data);

const validateUserData = async (req, res, next) => {
    try {
        const data = await validador(req.body);
        if (!data) return next();
        if (data.message) return res.status(data.code).json({ message: data.message });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = validateUserData;