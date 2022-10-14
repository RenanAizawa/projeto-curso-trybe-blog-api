const blogPostService = require('../services/BlogPost');

const deleteById = async (req, res) => {
    const { user } = req;
    const { id } = req.params;
    try {
        const result = await blogPostService.deleteByIdService(user, id);
        if (result === true) return res.status(204).end();
        if (result.message) return res.status(result.code).json({ message: result.message });
        return res.status(404).json({ message: 'controller em construção' }); 
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    deleteById,
};