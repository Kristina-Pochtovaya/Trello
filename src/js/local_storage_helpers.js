import { TODO_LIST } from './common'

export function getTodoList() {
  return JSON.parse(localStorage.getItem(TODO_LIST)) ?? []
}

export function setTodoList(todoList) {
  localStorage.setItem(TODO_LIST, JSON.stringify(todoList))
}
