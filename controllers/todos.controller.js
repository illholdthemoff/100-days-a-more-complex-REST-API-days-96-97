const Todo = require("../models/todo.model");

async function getAllTodos(req, res, next) {
  let todos; // let for scoping reasons
  try {
    //try in case connection to db fails
    todos = await Todo.getAllTodos();
  } catch (error) {
    return next(error);
  }

  res.json({
    todos: todos,
  }); // returning as a json object
}

async function addTodo(req, res, next) {
  const todoText = req.body.text; // need to ensure incoming body has a text field.

  const todo = new Todo(todoText); // passing the text in to create a new one. no ID because this is a new object.

  let insertedId;
  try {
    const result = await todo.save();
    insertedId = result.insertedId; // insertedId is generated when the todo is saved
  } catch (error) {
    return next(error);
  }

  todo.id = insertedId.toString(); // converting ObjectId to string

  res.json({ message: "Added todo successfully!", createdTodo: todo });
}

function updateTodo(req, res, next) {}

function deleteTodo(req, res, next) {}

module.exports = {
  getAllTodos: getAllTodos,
  addTodo: addTodo,
  updateTodo: updateTodo,
  deleteTodo: deleteTodo,
};
