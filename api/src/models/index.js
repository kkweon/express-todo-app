const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect(`${process.env.DB}/todo-api`);
mongoose.Promise = Promise;

module.exports.Todo = require("./todo.js");
