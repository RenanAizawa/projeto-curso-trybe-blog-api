const { BlogPost } = require('../models');

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

module.exports = {
    deleteByIdService,
};