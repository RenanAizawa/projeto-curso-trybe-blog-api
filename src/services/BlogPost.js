const { BlogPost, User, Category, PostCategory } = require('../models');

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

const createPostService = async (userId, title, content, categoryIds) => {
    console.log('dados do create: ', userId, title, content, categoryIds);
    if (!title || !content) return { code: 400, message: 'Some required fields are missing' };
    if (!categoryIds) return { code: 400, message: '"categoryIds" not found' };
    const newPost = await BlogPost.create({ title, content, userId });
    await Promise.all(
        categoryIds.forEach((categoryId) => {
            PostCategory.create({ postId: newPost.id, categoryId });
        }),
    );
    const data = await postById(newPost.id);
    return data;
};

module.exports = {
    deleteByIdService,
    createPostService,
    postById,
    getAllPosts,
};