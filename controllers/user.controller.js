const userService = require('../services/user.service');

const getUser = async (req, res, next) => {
  const query = req.query;
  console.log('query',query);
  try {
    const users = await userService.getUser();
    res.status(200); // move ra xài chung
    res.json(users);
    
  } catch (e) {
    res.sendStatus(500);
  }
};

module.exports = {
  getUser
};
