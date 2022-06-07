const express = require("express");

const db = require("./data/database");
const todosRoutes = require("./routes/todos.routes");

const app = express();

app.use(express.json()); // parses incoming requests with JSON payloads. looks at reqs where content type header matches the type option. it puts the parsed data into req.body

app.use("/todos", todosRoutes); // filter, those that have the prefix todos will go to todosRoutes

app.use(function (error, req, res, next) {
  res.status(500).json({
    message: "Something went wrong!",
  });
});

db.initDb()
  .then(function () {
    // initializing database and then calling for express app to listen to port 3000
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Connecting to the database failed!");
  });
