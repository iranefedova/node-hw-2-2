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

try {
  rpcMethod(data.id, data.params, {
    onSuccess: function(result) {
      res.send(JSON.stringify({
        jsonrpc: '2.0',
        result: result,
        error : null,
        id: data.id
      }), 200);
    },
    onFailure: function(error) {
      onError({
        code: -32603,
        message: 'Failed',
        data: error
      }, 500);
    }
  });
} catch (e) {
  onError({
    code: -32603,
    message: 'Exception at method call',
    data: e
  }, 500);
}
return;

function onError(err, statusCode) {
  res.status(statusCode).send(JSON.stringify({
    jsonrpc: '2.0',
    error: err,
    id: data.id
  }));
}

});
