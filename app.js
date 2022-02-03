const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Welcome to Invoice Builder Backend!');
});

app.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}`);
});