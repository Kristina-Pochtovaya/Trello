import { generateId } from './helpers'
import {
  generateCard,
  moveCardInProgress,
  moveCardToDone,
  moveCardToTodo,
  setTodosCount,
  setInProgressCount,
  setDoneCount,
} from './dom_helpers'
import { getTodoList, setTodoList } from './local_storage_helpers'
import { todoStatus } from './common'

export function addTodoBtnHandler() {
  const addTodoModalWindow = document.getElementById('add-todo-modal-window')
  addTodoModalWindow.classList.remove('add-todo_hidden')
}

export function deleteAllBtnHandler() {
  const todosList = getTodoList()
  const todosListActive = todosList.filter(
    (item) => item.status !== todoStatus.done
  )

  setTodoList(todosListActive)
  const doneCards = document.getElementById('done-cards')
  doneCards.classList.add('todo-cards_hidden')
  setDoneCount()
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
    status: todoStatus.todo,
  }

  const todoList = getTodoList()
  todoList.push(todo)
  setTodoList(todoList)

  generateCard(todo)

  todoTitle.value = ''
  todoDescription.value = ''
  addTodoModalWindow.classList.add('add-todo_hidden')
}

export function moveInProgressBtnHandler(e) {
  const todoId = e.target.id.split(' ')[1]
  const todosList = getTodoList()

  const updatedTodosList = todosList.map((item) =>
    item.id === todoId ? { ...item, status: todoStatus.inProgress } : item
  )

  setTodoList(updatedTodosList)
  moveCardInProgress(todoId)
  setTodosCount()
  setInProgressCount()
}

export function completeBtnHandler(e) {
  const todoId = e.target.id.split(' ')[1]
  const todosList = getTodoList()

  const updatedTodosList = todosList.map((item) =>
    item.id === todoId ? { ...item, status: todoStatus.done } : item
  )

  setTodoList(updatedTodosList)

  moveCardToDone(todoId)

  setInProgressCount()
  setDoneCount()
}

export function backBtnHandler(e) {
  const todoId = e.target.id.split(' ')[1]
  const todosList = getTodoList()

  const updatedTodosList = todosList.map((item) =>
    item.id === todoId ? { ...item, status: todoStatus.todo } : item
  )

  setTodoList(updatedTodosList)

  moveCardToTodo(todoId)

  setTodosCount()
  setInProgressCount()
}
