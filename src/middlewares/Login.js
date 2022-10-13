const login = require('../services/Login');

const isMissing = (email, password) => { 
    if (email && password) return true;
    return false; 
};

const userExist = async (email, password) => {
  const user = await login.userByEmail(email);
  if (!user || user.password !== password) return false;
  return true;
};

const loginValidate = (req, res, next) => {
  const { email, password } = req.body;
  try {
      const first = isMissing(email, password);
      if (!first) return res.status(400).json({ message: 'Some required fields are missing' });
      const second = userExist(email, password);
      if (!second) return res.status(400).json({ message: 'Invalid fields' });
      next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = loginValidate;