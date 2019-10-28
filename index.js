const express = require('express');

const server = express();

server.use(express.json()); //pegar a requisição no formato json

/*
Query params = ?users=1 'req.query.num'
Route params = /users/1 => /users/id 'req.params.id'
Request body = {"name": "Samir", "email": "samirjosue@gmail.com"}
*/

const users = [];

server.get('/users', (req, res) => {
  return res.json(users);
});

server.get('/users/:index', (req, res) => {
  const { index } = req.params;

  return res.json(users[index]);
});

server.post('/users', (req, res) => {
  const { name } = req.body;

  users.push(name);
  return res.json(users);
});

server.put('/users/:index', (req, res) => {
  const { index } = req.params;
  const { nome } = req.body;
  users[index] = nome;

  return res.json(users);
});

server.delete('/users/:index', (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);
  return res.send(); //Só envia a resposta que deu tudo certo
});

server.listen(3000);
