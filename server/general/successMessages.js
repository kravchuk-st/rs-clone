const successMessages = {
  server: {
    dbConnected: 'Connected to DB',
    listen: (port) => `Server is listening on ${port}`,
  },
  auth: {
    register: 'Registered successfully',
    login: 'Login successful',
    logout: 'Logout successful',
  },
};

module.exports = successMessages;
