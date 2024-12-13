const db = require('../utils/knex');
const { getRandomCharacter } = require('../utils/randomUserAPI');
const jwt = require('jsonwebtoken');


const signUp = async (req, res, next) => {
  const { email } = req.body;
  try {
    const existingUser = await db('users').where({ email }).first();

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    // Get Random Character Data from randomuser.me 
    const { firstName, lastName, country } = await getRandomCharacter();
    const [newUser] = await db('users')
      .insert({
        email,
        first_name: firstName,
        last_name: lastName,
        country,
        role: 'Cool Kid',
      })
      .returning('*');

    // JWT token generation
    const token = jwt.sign(
      { email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    const userData = {
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      country: newUser.country,
      email: newUser.email,
      role: newUser.role,
    };

    return res.status(201).json({
      token,
      user: userData,
    });
  } catch (error) {
    return next(error);
  }
};


const login = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await db('users').where({ email }).first();

    if (!user) {
      return res.status(400).json({ message: 'Invalid email address.' });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const userData = {
      firstName: user.first_name,
      lastName: user.last_name,
      country: user.country,
      email: user.email,
      role: user.role,
    };

    return res.status(200).json({
      status: "success",
      data: {
        token,
        user: userData
      },
      message: "User Logged in successfully!"
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { signUp, login };
