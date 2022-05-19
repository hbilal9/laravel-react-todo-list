import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import { Modal } from "react-bootstrap";
import * as todoService from "../apiServices/todo_service";

export default function Todos() {
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState({});
  const [todoId, setTodoId] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    async function getTodos() {
      const response = await todoService.getTodos();
      setTasks([...response.data]);
    }
    getTodos();
  }, []);

  useEffect(() => {
    setTasks([data, ...tasks]);
  }, [data]);

  const addTodo = async function (event) {
    event.preventDefault();
    const response = await todoService.addTodo({ title, description });
    setData(response.data);
    setTitle("");
    setDescription("");
    setShow(false);
  };

  const deleteTodo = async (id) => {
    if (!confirm("Are you sure to delete ?")) {
      return;
    }
    await todoService.deleteTodo(id);
    setTasks(tasks.filter((task) => task.id != id));
  };

  const updateTodo = async function (event) {
    event.preventDefault();
    const response = await todoService.updateTodo(todoId, {
      title,
      description,
    });
    const updatedData = tasks.map((task) => {
      if (task.id == todoId) {
        return response.data;
      }
      return task;
    });
    setTasks(updatedData);
    setTitle("");
    setDescription("");
    setShow(false);
  };

  const markedCompleted = async function (id) {
    if (!confirm("Are you sure to marked as completed ?")) {
      return;
    }
    const response = await todoService.markedCompleted(id);
    const updatedData = tasks.map((task) => {
      if (task.id == id) {
        return response.data;
      }
      return task;
    });
    setTasks(updatedData);
  };

  const repeatTask = async function (id) {
    if (!confirm("Are you sure to repeat task ?")) {
      return;
    }
    const response = await todoService.repeatTask(id);
    const updatedData = tasks.map((task) => {
      if (task.id == id) {
        return response.data;
      }
      return task;
    });
    setTasks(updatedData);
  };

  const showUpdateTodoModal = (todo) => {
    setIsEdit(true);
    setTodoId(todo.id);
    setTitle(todo.title);
    setDescription(todo.description);
    setShow(true);
  };

  const showAddTodoModal = () => {
    setIsEdit(false);
    setTodoId("");
    setTitle("");
    setDescription("");
    setShow(true);
  };

  return (
    <div>
      <div className="d-flex justify-content-between mt-4 mb-4">
        <h1>Todos</h1>
        <button className="btn btn-primary" onClick={() => showAddTodoModal()}>
          Add Task
        </button>
      </div>
      <ul className="list-group">
        {tasks.map((task, i) => (
          <li className="list-group-item" key={i}>
            <Todo
              task={task}
              deleteTodo={deleteTodo}
              updateTodo={showUpdateTodoModal}
              markedCompleted={markedCompleted}
              repeatTask={repeatTask}
            />
          </li>
        ))}
      </ul>

      {/* Modal */}

      <Modal size="md" show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          {isEdit ? <h3>Update Todo</h3> : <h3>Add New Todo</h3>}
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={isEdit ? updateTodo : addTodo}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                rows={3}
                cols={4}
                value={description}
                id="description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <hr />
            <div className="text-end mb-2 ml-2 mr-4">
              <button
                type="button"
                className="btn btn-default"
                onClick={() => setShow(false)}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                {isEdit ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
