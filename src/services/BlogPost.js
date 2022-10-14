const { BlogPost, User, Category } = require('../models');

const deleteByIdService = async (user, id) => {
    // console.log('SERVICE blogpost user:', user);
    const post = await BlogPost.findOne({ where: { id } });
    console.log('service post:', post);
    if (!post) return { code: 404, message: 'Post does not exist' };
    if (user.dataValues.id !== post.dataValues.userId) {
        console.log('entrei no validador:', post.dataValues.userId !== user.dataValues.id);
        return { code: 401, message: 'Unauthorized user' };
    }
    if (user.dataValues.id === post.dataValues.userId) {
        await BlogPost.destroy({ where: { id } });
        return true;
    }
    return false;
};

const postById = async (id) => {
    const post = await BlogPost.findOne({ where: { id },
    include: [{
        model: User,
          as: 'user',
          attributes: ['id', 'displayName', 'email', 'image'],
    },
{
    model: Category,
          as: 'categories',
          through: { attributes: [] },
}], 
});
    if (!post) return { code: 404, message: 'Post does not exist' };
    return post;
};

const getAllPosts = async () => {
    const post = await BlogPost.findAll({
        include: [{
            model: User,
              as: 'user',
              attributes: ['id', 'displayName', 'email', 'image'],
        },
    {
        model: Category,
              as: 'categories',
              through: { attributes: [] },
    }], 
    });
    if (!post || post.length === 0) return { code: 404, message: 'Post not exist' };
    return post;
};

const createPostService = async () => {};

module.exports = {
    deleteByIdService,
    createPostService,
    postById,
    getAllPosts,
};