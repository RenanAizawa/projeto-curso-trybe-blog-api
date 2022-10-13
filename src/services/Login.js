const userModel = require('../models/User');

const userByEmail = async (email) => {
    const data = await userModel.findOne({ where: { email } });
    return data;
};

module.exports = {
  userByEmail,
};