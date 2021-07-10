const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//create a todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM todo");

    res.json(todos.rows);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const todos = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [id]);

    res.json(todos.rows[0]);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    // const idFrom = req.params.id;
    const { description, todo_id } = req.body;
    console.log(description, todo_id);
    const todos = await pool.query(
      "UPDATE todo SET description=$1 WHERE todo_id=$2 RETURNING *",
      [description, todo_id]
    );

    res.json("Todo was updated!");
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const todos = await pool.query(
      "Delete from todo WHERE todo_id=$1 RETURNING *",
      [id]
    );

    res.json("Todo was deleted");
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
