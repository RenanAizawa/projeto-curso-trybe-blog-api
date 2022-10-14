const catService = require('../services/Category');

const createCat = async (req, res) => {
    const { name } = req.body;
    console.log('name do body:', name);
    try {
        const data = await catService.createCAt(name);
        if (data.message) return res.status(data.code).json({ message: data.message });
        // console.log('controller create data:', data);
        return res.status(201).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const allCat = async (req, res) => {
    try {
        const data = await catService.allCat();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createCat,
    allCat,
};