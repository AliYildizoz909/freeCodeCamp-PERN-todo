import React, { Fragment, useEffect, useState } from "react";

const EditTodo = ({todo}) => {
    const onEditHandler = async (e) => {
        e.preventDefault();
        try {

            const body = { todo_id: todo.todo_id, description };
            await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }).then(response => response.json()).then(() => {
                window.location = "/";
            });


        } catch (error) {
            console.error(error.message);
        }
    };

    const [description, setDescription] = useState();
    // useEffect(() => {
    //     setDescription(todo.description)
    //     console.log(todo)
    // }, []);

    return (
        <Fragment>
            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#Modal${todo.todo_id}`} onClick={() => console.log(todo)}>Edit</button>
            <div onClick={() => setDescription(todo.description)} className="modal fade" id={`Modal${todo.todo_id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Todo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="close" onClick={() => setDescription(todo.description)}></button>
                        </div>
                        <div className="modal-body">
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
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