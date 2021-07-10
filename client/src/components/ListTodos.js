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
          {todos.map((todo,i) => {
            return (
              <tr key={i}>
                <td>{todo.description}</td>
                <td>Edit</td>
                <td>Delete</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
