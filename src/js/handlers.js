import { generateId } from './helpers'
import { generateCard } from './dom_helpers'

export function addTodoBtnHandler() {
  const addTodoModalWindow = document.getElementById('add-todo-modal-window')
  addTodoModalWindow.classList.remove('add-todo_hidden')
}

export function cancelBtnHandler() {
  const todoTitle = document.getElementById('add-todo__title_input')
  const todoDescription = document.getElementById('add-todo__description_input')
  const addTodoModalWindow = document.getElementById('add-todo-modal-window')

  todoTitle.value = ''
  todoDescription.value = ''
  addTodoModalWindow.classList.add('add-todo_hidden')
}

export function confirmBtnHandler() {
  const todoTitle = document.getElementById('add-todo__title_input')
  const todoDescription = document.getElementById('add-todo__description_input')
  const addTodoModalWindow = document.getElementById('add-todo-modal-window')

  const todo = {
    id: generateId(),
    createTime: new Date().toLocaleTimeString(),
    title: todoTitle.value,
    description: todoDescription.value,
    user: 'MOCK USER',
  }

  const localStorageTodoList =
    JSON.parse(localStorage.getItem('todoList')) ?? []
  localStorageTodoList.push(todo)
  localStorage.setItem('todoList', JSON.stringify(localStorageTodoList))

  generateCard(todo)

  todoTitle.value = ''
  todoDescription.value = ''
  addTodoModalWindow.classList.add('add-todo_hidden')
}
