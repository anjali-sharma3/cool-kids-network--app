const axios = require('axios');

const getRandomCharacter = async () => {
  const response = await axios.get('https://randomuser.me/api/');
  const data = response.data.results[0];

  return {
    firstName: data.name.first,
    lastName: data.name.last,
    country: data.location.country,
  };
};

module.exports = { getRandomCharacter };
