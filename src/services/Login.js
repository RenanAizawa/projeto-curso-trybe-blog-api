const { User } = require('../models');

const userByEmail = async (email) => {
    const data = await User.findOne({ where: { email } });
    return data;
};

module.exports = {
  userByEmail,
};