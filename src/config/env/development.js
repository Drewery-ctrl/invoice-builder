export const devConfig = {
  env: 'development',
  port: process.env.PORT || 3001,
  database: {
    host: 'localhost',
    port: 27017,
    name: 'invoice-builder',
  },
  jwt: {
    secret: 'VQEOBFNL3YQRYFZG',
  },
};