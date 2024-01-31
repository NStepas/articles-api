import 'dotenv/config';

export default () => ({
  auth: {
    lifetime: 2000,
    key: process.env.SECRET_KEY,
    accessTokenLifetime: '1',
  },
});
