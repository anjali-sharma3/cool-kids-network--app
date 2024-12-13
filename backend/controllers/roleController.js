const db = require('../utils/knex');

const updateUserRole = async (req, res, next) => {
  try {
    const { role, id } = req.body;
  
    if (!['Cool Kid', 'Cooler Kid', 'Coolest Kid'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    const updatedUser = await db('users').update({
      role: role
    }).where({ id: id });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Role updated successfully', user: updatedUser });
  } catch (error) {
    return next(error);
  }
};

module.exports = { updateUserRole };

