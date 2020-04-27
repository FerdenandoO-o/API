const { Op } = require('sequelize');
const User = require('../models/User');

module.exports = {
  async show(req, res) {
  
    const users = await User.findAll({
      attributes: ['name', 'email'],
      where: {
        email: {
          [Op.iLike]: '%@email.com.br'
        }
      },
      include: [
        { 
          association: 'addresses', 
          where: { 
            street: 'Rua das ruas'
          } 
        },
        { 
          association: 'techs', 
          required: false,
          where: {
            name: {
              [Op.iLike]: 'ReactNative%'
            }
          }
        },
      ]
    })

    return res.json(users);
  }
};