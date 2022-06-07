const mongodb = require("mongodb");

const db = require("../data/database");

class Todo {
  constructor(text, id) {
    // constructor is called automatically when a new instance of this class is created.
    this.text = text;
    this.id = id; // might not always be defined, like when we are instantiating a new Todo
  }

  static async getAllTodos() {
    const todoDocuments = await db.getDb().collection("todos").find().toArray(); // finding all entries within the todos collection and converting them to an array

    return todoDocuments.map(function (todoDocument) {
      return new Todo(todoDocument.text, todoDocument._id);
    }); // then takes the array and creates a new one populated with the results of calling a provided function on all elements in the claling array. This does NOT change the original array. Again it calls a function once for each element. In this case it would be returning a new Todo for each in the array
  }

  save() {
    if (this.id) {
      //if the object has an id already, ie already exists
      const todoId = new mongodb.ObjectId(this.id); // cconverts this.id into the mongo-readable _id object
      return db
        .getDb()
        .collection("todos")
        .updateOne({ _id: todoId }, { $set: { text: this.text } }); // goes into the todos colleciton on the database and then updates the given record based on the this.id which was converted into a mongo id format via .ObjectId(). Then it goes into the text field and sets the text as whatever it was set to above.
    } else {
      //no prior existing id, a new object
      return db.getDb().collection("todos").insertOne({ text: this.text }); // goes into the todos collection of our database and inserts the given text into it. Both yields and then of course immediately returns a promise, which resolves to an object containing the id that was inserted.
    }
  }

  delete() {
    if (!this.id) {
      throw new Error("Trying to delete todo without id!");
    }

    const todoId = new mongodb.ObjectId(this.id); // same process as above

    return db.getDb.collection("todos").deleteOne({ _id: todoId }); // going in and deleting the record with id that matches.
  }
}

module.exports = Todo;
