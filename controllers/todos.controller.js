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

async function updateTodo(req, res, next) {
  const todoId = req.params.id; // grabbing the id from params.id
  const newTodoText = req.body.newText; // grabbing new text that is entered when trying to update

  const todo = new Todo(newTodoText, todoId); // creating a new todo object with the two given values

  try {
    await todo.save();
  } catch (error) {
    return next(error);
  }

  res.json({ message: "Todo updated", updatedTodo: todo }); // json response saying it succeeded
}

async function deleteTodo(req, res, next) {
  const todoId = req.params.id; // grabbing the id from params.id

  const todo = new Todo(null, todoId); // creating a new todo object with the two given values

  try {
    await todo.delete(); // returns a promise, thus we are awaiting it
  } catch (error) {
    return next(error);
  }

  res.json({ message: "Todo deleted" }); // json response saying it succeeded
}

module.exports = {
  getAllTodos: getAllTodos,
  addTodo: addTodo,
  updateTodo: updateTodo,
  deleteTodo: deleteTodo,
};
