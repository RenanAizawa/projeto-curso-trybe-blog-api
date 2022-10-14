const { User } = require('../models');

const newUser = async (data) => {
    const newData = await User.create(data);
    if (!newData) throw new Error('erro no newUser');
    return newData;
};

const newEmail = async (email) => {
    const newData = await User.findOne({ where: { email }, attributes: { exclude: ['password'] } });
    if (newData) return true;
};

const getAll = async () => {
  const data = await User.findAll({ attributes: { exclude: ['password'] } });
  return data;
};

const getById = async (id) => {
  const data = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  return data;
};

const deleteMeService = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  newUser,
  newEmail,
  getAll,
  getById,
  deleteMeService,
};