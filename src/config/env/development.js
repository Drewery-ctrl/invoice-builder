export const devConfig = {
   env: 'development',
   port: process.env.PORT || 3001,
   frontendURL: 'http://localhost:4200',
   sessionSecret: 'developmentSessionSecret',
   database: {
      host: 'localhost',
      port: 27017,
      name: 'invoice-builder',
   },
   jwt: {
      secret: 'VQEOBFNL3YQRYFZG',
   },
   google: {
      client_id: "921145828297-0370ocq5vk5rg0n69ohhi3rfbq9fah8m.apps.googleusercontent.com",
      project_id: "invoice-builder-340819",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_secret: "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",
      callbackURL: "http://localhost:3001/api/v1/auth/google/callback"
   },
   twitter: {
      api_key: "nMxhOxNgvyplausVXNwdAv8nw",
      api_key_secret: "tPycyAWWihhOMrXtfOmEgrhgGyfDg8JX9S1m7X461lyKMOq0B7",
      bearer_token: "AAAAAAAAAAAAAAAAAAAAAGxoZAEAAAAAwiEnaq033QeCiTWxxFWeIiHQHRU%3Dwg8L0xf6qTyRVc4OmhKvIbCsnhT5AshA5a65v4EkA5d3WrPJka",
      client_id: "TE9TSTZRMEFvWEczWDRhaE5xTEU6MTpjaQ",
      client_secret: "D2dlsxEx_FZ_iBDqQtU62JOUoY7iHUJZ2OX3evEQT0dO02OkDo",
      callbackURL: "http://localhost:3001/api/v1/auth/twitter/callback"
   }
};