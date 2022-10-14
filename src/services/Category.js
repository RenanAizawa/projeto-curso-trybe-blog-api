const { Caterogy } = require('../models');

const createCAt = async (name) => {
    if (!name) return { code: 400, message: '"name" is required' };
    console.log('name no service cat:', name);
    const data = await Caterogy.create({ name });
    console.log('create category service:', data);
    return data;
};

const allCat = async () => {
    const data = await Caterogy.findAll();
    return data;
};

module.exports = {
    createCAt,
    allCat,
};