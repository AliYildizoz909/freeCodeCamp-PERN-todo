import React, { Fragment, useEffect, useState } from "react";

const EditTodo = ({ todo, todos, setTodos }) => {
    const onEditHandler = async () => {
        try {

            const body = { todo_id: todo.todo_id, description };
            await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }).then(response => response.json()).then(() => {
                setTodos([{ todo_id: todo.todo_id, description }, ...todos.filter((t) => t.todo_id !== todo.todo_id)]);
            });


        } catch (error) {
            console.error(error.message);
        }
    };
    const [description, setDescription] = useState("");

    return (
        <Fragment>
            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Todo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setDescription(e.target.value)}
                                defaultValue={todo.description}
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning" onClick={onEditHandler} data-bs-dismiss="modal">Save</button>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default EditTodo;