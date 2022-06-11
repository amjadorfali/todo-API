const fs = require('fs');
const path = require('path');

module.exports.fetchTodos = fs.readFileSync(path.join(__dirname, 'fetchTodos.gql'), 'utf8');
module.exports.getCurrentAuthenticatedUser = fs.readFileSync(path.join(__dirname, 'getCurrentAuthenticatedUser.gql'), 'utf8');
module.exports.getUserByEmail = fs.readFileSync(path.join(__dirname, 'getUserByEmail.gql'), 'utf8');
module.exports.getUserByUserName = fs.readFileSync(path.join(__dirname, 'getUserByUserName.gql'), 'utf8');
