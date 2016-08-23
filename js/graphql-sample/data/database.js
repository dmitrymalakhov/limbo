export class User {}

let nextId = 0;
let userById = {};

const viewer = {};

addUser('TEST 1');
addUser('TEST 2');

export function addUser(name) {
  const user = new User();

  user.id = `${nextId++}`;
  user.name = name;

  userById[user.id] = user;

  return user.id;
}

export function getUser(id) {
  return userById[id];
}

export function getUsers() {
  return userById;
}