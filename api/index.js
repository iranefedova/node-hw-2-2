const express = require('express');
const app = module.exports = express();
const User = require('../User');

let users = new Array();

// 127.0.0.1:3000/api/users?name=Ivan&score=17
app.get("/users", function(req, res) {
  if (users.lenght > 0) {
    res.send(users);
  } else {
    res.send('No users yet');
  }
});

app.post("/users", function(req, res) {
  let newUser = new User(users.length, req.query.name, req.query.score);
  users.push(newUser);
  res.send('User was successfully added!');
});

app.get("/users/:id", function(req, res) {
  let tmp = null;
  for (let i=0; i<users.length; i++) {
    if (users[i].id == req.params.id) {
      tmp = users[i];
    }
  }
  if (tmp != null) {
    res.send(tmp);
  } else {
    res.status(400);
    res.send('User not found');
  }
});

app.put("/users/:id", function(req, res) {
  let tmp = false;
  for (let i=0; i<users.length; i++) {
    if (users[i].id == req.params.id) {
      users[i].name = req.query.name;
      users[i].score = req.query.score;
      tmp = true;
    }
  }
  if (tmp) {
    res.json({message: 'OK'});
  } else {
    res.status(400);
    res.send('User not found');
  }
});

app.delete("/users/:id", function(req, res) {
  let tmp = false;
  for (let i=0; i<users.length; i++) {
    if (users[i].id == req.params.id) {
      users.splice(i, 1);
      tmp = true;
    }
  }
  if (tmp) {
    res.json({message: 'OK'});
  } else {
    res.status(400);
    res.send('User not found');
  }
});
