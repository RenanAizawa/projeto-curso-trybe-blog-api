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
    // console.log('dados do create: ', userId, title, content, categoryIds);
    if (!title || !content) return { code: 400, message: 'Some required fields are missing' };
    const catIds = await Category.findAll();
    // console.log('CAtIDS: ', catIds[0].dataValues.id);
    const idsEstraidos = catIds.map((cat) => cat.dataValues.id);
    // console.log('idsEstraidos : ', idsEstraidos);
    console.log('testando : ', categoryIds.map((id) => idsEstraidos.some((idVal) => idVal === id)));
    if (!categoryIds.map((id) => idsEstraidos.some((idVal) => idVal === id))[0]) {
        return { code: 400, message: '"categoryIds" not found' };
    } 
    const newPost = await BlogPost
    .create({ title, content, userId, published: Date.now(), updated: Date.now() });
    // console.log('post criado: ', newPost.dataValues);
    categoryIds.forEach(async (categoryId) => PostCategory
    .create({ postId: newPost.dataValues.id, categoryId }));
    return newPost.dataValues;
};

module.exports = {
    deleteByIdService,
    createPostService,
    postById,
    getAllPosts,
};