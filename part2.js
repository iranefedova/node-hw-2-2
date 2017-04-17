const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api/rpc.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

app.use("/api", api);
app.all('*', (req, res) => {
  res.send('Invalid format');
});
// app.use(function(err, req, res, next) {
//   console.log(err.stack);
//   res.status(500).send({error: 'Something failed! Please try again'});
// });

app.listen(3000, () => {
  console.log('Server start... Waiting for connections.');
});
