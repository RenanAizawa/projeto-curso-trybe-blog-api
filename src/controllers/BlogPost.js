const blogPostService = require('../services/BlogPost');

const deleteById = async (req, res) => {
    const { user } = req;
    const { id } = req.params;
    try {
        const result = await blogPostService.deleteByIdService(user, id);
        if (result === true) return res.status(204).end();
        if (result.message) return res.status(result.code).json({ message: result.message });
        return res.end();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const createPost = async (req, res) => {
    const {
        body: {
            title, content, categoryIds,
        },
        user: { dataValues: { id } },
    } = req;
    // console.log('controller dados:', title, content, categoryIds);
    // console.log('req.body:', req.body);
    try {
        const data = await blogPostService.createPostService(id, title, content, categoryIds);
        if (data.message) return res.status(data.code).json({ message: data.message });
        return res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const postById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await blogPostService.postById(id);
        if (post.message) return res.status(post.code).json({ message: post.message });
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const post = await blogPostService.getAllPosts();
        if (post.message) return res.status(post.code).json({ message: post.message });
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    deleteById,
    createPost,
    postById,
    getAllPosts,
};