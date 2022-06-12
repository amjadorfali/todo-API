const fs = require('fs');
const path = require('path');

module.exports.addTodo = fs.readFileSync(path.join(__dirname, 'addTodo.gql'), 'utf8');
module.exports.removeTodo = fs.readFileSync(path.join(__dirname, 'removeTodo.gql'), 'utf8');
module.exports.signIn = fs.readFileSync(path.join(__dirname, 'signIn.gql'), 'utf8');
module.exports.signUp = fs.readFileSync(path.join(__dirname, 'signUp.gql'), 'utf8');
module.exports.updateTodo = fs.readFileSync(path.join(__dirname, 'updateTodo.gql'), 'utf8');
module.exports.updateUserDetails = fs.readFileSync(path.join(__dirname, 'updateUserDetails.gql'), 'utf8');
