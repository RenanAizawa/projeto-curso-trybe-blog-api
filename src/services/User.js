const { User } = require('../models');

const newUser = async (data) => {
    const newData = await User.create(data);
    if (!newData) throw new Error('erro no newUser');
    return newData;
};

const newEmail = async (email) => {
    const newData = await User.findOne({ where: { email } });
    if (newData) return true;
};

module.exports = {
  newUser,
  newEmail,
};