import React from "react";

export default function Todo({
  task,
  deleteTodo,
  updateTodo,
  markedCompleted,
  repeatTask,
}) {
  return (
    <div className="d-flex justify-content-between">
      <div className={task.is_completed ? "text-strike" : ""}>
        {task?.title}
      </div>
      <div>{task?.description}</div>
      <div>
        <button
          className="btn btn-danger mr-3"
          onClick={() => deleteTodo(task.id)}
        >
          <i className="fa fa-x"></i>
        </button>
        <button className="btn btn-info ml-2" onClick={() => updateTodo(task)}>
          <i className="fa fa-edit"></i>
        </button>
        {task.is_completed ? (
          <button
            className="btn btn-warning ml-2"
            onClick={() => repeatTask(task.id)}
          >
            <i className="fa fa-repeat"></i>
          </button>
        ) : (
          <button
            className="btn btn-success ml-2"
            onClick={() => markedCompleted(task.id)}
          >
            <i className="fa fa-check"></i>
          </button>
        )}
      </div>
    </div>
  );
}
