const axios = require('axios')

/**
 * Returns an HTML page containing an interactive Web-based
 * tutorial. Visit the function URL to see it and learn how
 * to build with lambda.
 */
exports.handler = async (event) => {
    const url = `https://jsonplaceholder.typicode.com/todos/${event.id}`;
    try {
      const result = await axios.get(url);
      const response = {
          statusCode: 200,
          headers: {
              'Content-Type': 'application/json',
          },
          body: result,
      };
      return response;
    } catch (err) {
      const response = {
          statusCode: 400,
          headers: {
              'Content-Type': 'application/json',
          },
          body: err,
      };
      return response;
    }
};
