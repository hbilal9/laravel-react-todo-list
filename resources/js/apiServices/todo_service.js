import { http } from "./http_service";

export function getTodos() {
  return http().get('/todos');
}

export function addTodo(data) {
  return http().post('/todos', data);
}

export function deleteTodo(id) {
  return http().delete(`/todos/${id}`);
}

export function updateTodo(id, data) {
  return http().put(`/todos/${id}`, data);
}

export function markedCompleted(id) {
  return http().put(`/marked-as-completed/${id}`);
}

export function repeatTask(id) {
  return http().put(`/repeat-task/${id}`);
}