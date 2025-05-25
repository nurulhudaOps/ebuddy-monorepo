import dotenv from 'dotenv';
dotenv.config();

const configs = {
  server: {
    name: process.env.SERVER_NAME || 'Backend',
    port: process.env.PORT || 5000,
    host: process.env.HOST || '127.0.0.1',
  },
  middleware: {
    basicUser: process.env.BASIC_USER || 'admin',
    basicPass: process.env.BASIC_PASS || 'password',
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  },
  firebase: {
    type: process.env.FIREBASE_TYPE,
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    clientId: process.env.FIREBASE_CLIENT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
    authUri: process.env.FIREBASE_AUTH_URI,
    tokenUri: process.env.FIREBASE_TOKEN_URI,
    authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  },
};

export default configs;
