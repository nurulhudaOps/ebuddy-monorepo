import dotenv from 'dotenv';
dotenv.config();

const configs = {
  server: {
    name: process.env.SERVER_NAME || 'Backend',
    port: process.env.PORT || 5000,
    host: process.env.HOST || '127.0.0.1',
  },
};

export default configs;
