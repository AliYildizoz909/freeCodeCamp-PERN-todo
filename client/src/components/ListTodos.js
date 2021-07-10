import React, { Fragment, useEffect, useState } from "react";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);
  const getTodos = async () => {
    try {
      await fetch("http://localhost:5000/todos")
        .then((response) => response.json())
        .then((data) => setTodos(data));
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteTodo = async (id) => {
    try {
      const response = await fetch("http://localhost:5000/todos/"+id, {
        method: "DELETE",
      });

      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  });
  return (
    <Fragment>
      <table className="table mt-5 text-left">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, i) => {
            return (
              <tr key={i}>
                <td>{todo.description}</td>
                <td>Edit</td>
                <td>
                  <button onClick={() => {onDeleteTodo(todo.todo_id)}} className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
