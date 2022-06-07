const express = require("express");

const todosController = require("../controllers/todos.controller");

const router = express.Router(); // calling router function on router

router.get("/", todosController.getAllTodos); // /todos

router.post("/", todosController.addTodo);

router.patch("/:id", todosController.updateTodo); // /:id is a dynamic path parameter

router.delete("/:id", todosController.deleteTodo);

module.exports = router;
