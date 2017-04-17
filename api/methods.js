const User = require('../User');
let users = new Array();

const add = (id, params, callback) => {
  let newUser = new User(users.length, params.name, params.score);
  users.push(newUser);
  callback('User was successfully added!');
}

const edit = (id, params, callback) => {
  let tmp = false;
  for (let i=0; i<users.length; i++) {
    if (users[i].id == id) {
      users[i].name = params.name;
      users[i].score = params.score;
      tmp = true;
    }
  }
  if (tmp) {
    callback('OK');
  } else {
    callback('User not found');
  }
}

const del = (id, params, callback) => {
  let tmp = false;
  for (let i=0; i<users.length; i++) {
    if (users[i].id == id) {
      users.splice(i, 1);
      tmp = true;
    }
  }
  if (tmp) {
    callback('OK');
  } else {
    callback('User not found');
  }
}

const get = (id, params, callback) => {
  let tmp = false;
  for (let i=0; i<users.length; i++) {
    if (users[i].id == id) {
      tmp = users[i];
    }
  }
  if (tmp) {
    callback(tmp);
  } else {
    callback('User not found');
  }
}

module.exports = {
  add,
  del,
  get,
  edit
}
