const db = require("../models");
exports.getTodos = function(req, res) {
  db.Todo
    .find()
    .then(function(todos) {
      res.json(todos);
    })
    .catch(function(err) {
      res.send(err);
    });
};
exports.createTodo = function(req, res) {
  db.Todo
    .create(req.body)
    .then(newTodo => {
      res.status(201).json(newTodo);
    })
    .catch(error => {
      res.send(error);
    });
};
exports.getTodoById = function(req, res) {
  db.Todo
    .findById(req.params.todoId)
    .then(todo => {
      res.send(todo);
    })
    .catch(err => {
      res.send(err);
    });
};

exports.updateTodo = function(req, res) {
  db.Todo
    .findByIdAndUpdate(req.params.todoId, req.body, { new: true })
    .then(todo => {
      res.send(todo);
    })
    .catch(err => {
      res.send(err);
    });
};
exports.deleteTodo = function(req, res) {
  db.Todo
    .findByIdAndRemove(req.params.todoId)
    .then(todo => res.send(todo))
    .catch(err => res.send(err));
};
module.exports = exports;
