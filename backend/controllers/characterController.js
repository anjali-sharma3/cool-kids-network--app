const db = require('../utils/knex');

const getMyCharacter = async (req, res, next) => {
  const { email } = req.user;
  try {
    const character = await db('users').where({ email }).first();

    if (!character) {
      return res.status(404).json({ message: 'Character not found.' });
    }

    return res.status(200).json(character);
  } catch (error) {
    return next(error);
  }
};

const getAllCharacters = async (req, res, next) => {
  try {
    const userRole = req.user.role;

    if (userRole === 'Cool Kid') {
      return res.status(403).json({ message: "you don't have access to see this data" });
    }

    const users = await db('users').select('id', 'first_name', 'last_name', 'country', 'email', 'role').whereNot('role', 'Maintainer');

    if (userRole === 'Cooler Kid') {
      const filteredUsers = users.map(user => ({
        first_name: user.first_name,
        last_name: user.last_name,
        country: user.country,
      }));
      return res.status(200).json(filteredUsers);
    }

    if (userRole === 'Coolest Kid' || userRole === 'Maintainer') {
      const filteredUsers = users.map(user => ({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        country: user.country,
        email: user.email,
        role: user.role,
      }));
      return res.status(200).json(filteredUsers);
    }

    return res.status(403).json({ message: 'Invalid role' });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getMyCharacter, getAllCharacters };
