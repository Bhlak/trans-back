const express = require('express');
const app = express();
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('../routes/auth');
const productRoute = require('../routes/products');
const cors = require('cors');

dotenv.config();

mongoose.connect(process.env.DB_CONN).then(() => {
  console.log('Connection successful');
}).catch = (err) => {
  console.log(err);
};

app.use(express.json());
app.use(cors());
app.use(`${process.env.NTL_ROUTE}/auth`, authRoute);
app.use(`${process.env.NTL_ROUTE}/products`, productRoute);

// BASE URL FOR API: https://jazzy-vacherin-4c19af.netlify.app/

// app.listen(4000, () => {
//   console.log('Listening on port 4000');
// });

module.exports.handler = serverless(app);
