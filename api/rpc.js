const express = require('express');
const app = module.exports = express();

var rpcMethods = require('./methods.js');

// {
// 	"jsonrpc": "2.0",
// 	"method": "add",
// 	"params": {"name": "Ivan", "score": 1},
// 	"id": 0
// }

app.post("/users", function(req, res) {
  let data = req.body,  err = null, rpcMethod;
  if (!err && data.jsonrpc !== '2.0') {
    onError({
      code: -32600,
      message: 'Bad Request. JSON RPC version is invalid or missing',
      data: null
    }, 400);
    return;
  }

  if (!err && !(rpcMethod = rpcMethods[data.method])) {
    onError({
      code: -32601,
      message: 'Method not found: ' + data.method
    }, 404);
    return;
  }

  rpcMethod(data.id, data.params, (err, result) => {
      (err) ? onError(err, 500) :
          onSuccess(result)
  });


function onSuccess(result) {
  res.status(200).send(JSON.stringify({
    jsonrpc: '2.0',
    result: result,
    error : null,
    id: data.id
  }));
}

function onError(err, statusCode) {
  res.status(statusCode).send(JSON.stringify({
    jsonrpc: '2.0',
    error: err,
    id: data.id
  }));
}

});
