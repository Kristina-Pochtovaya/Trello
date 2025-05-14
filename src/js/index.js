import { createDate, setDoneCount } from './dom_helpers'
import {
  addTodoBtnHandler,
  cancelBtnHandler,
  confirmBtnHandler,
  deleteAllBtnHandler,
  searchInputHandler,
  searchInputClearHandler,
} from './handlers'
import {
  handleOnDOMContentLoaded,
  moveCardInProgress,
  moveCardToTodo,
  moveCardToDone,
  setDoneCount,
  setTodosCount,
  setInProgressCount,
} from './dom_helpers'
import { getTodoList, setTodoList } from './local_storage_helpers'
import { todoStatus } from './common'

createDate()

document.addEventListener('DOMContentLoaded', () => {
  handleOnDOMContentLoaded()
})

const addTodoBtn = document.getElementById('add_todo')
addTodoBtn.addEventListener('click', addTodoBtnHandler)

const cancelBtn = document.getElementById('add-todo__cancel-btn')
cancelBtn.addEventListener('click', cancelBtnHandler)

const confirmBtn = document.getElementById('add-todo__confrim-btn')
confirmBtn.addEventListener('click', confirmBtnHandler)

const deleteAllBtn = document.getElementById('delete_all')
deleteAllBtn.addEventListener('click', deleteAllBtnHandler)

const searchInput = document.getElementById('search-input')
searchInput.addEventListener('input', (e) => searchInputHandler(e.target.value))

const searchInputClear = document.getElementById('clear-search')
searchInputClear.addEventListener('click', searchInputClearHandler)

const dropZoneInProgress = document.getElementById('in-progress-cards')
dropZoneInProgress.addEventListener('dragenter', (e) => {
  e.preventDefault()
  dropZoneInProgress.classList.add('cards_in-progress_highlight')
})

dropZoneInProgress.addEventListener('dragleave', () => {
  dropZoneInProgress.classList.remove('cards_in-progress_highlight')
})
dropZoneInProgress.addEventListener('dragover', (e) => {
  e.preventDefault()
})

dropZoneInProgress.addEventListener('drop', (e) => {
  e.preventDefault()
  const id = e.dataTransfer.getData('text/plain')
  const todosList = getTodoList()
  const updatedTodosList = todosList.map((item) =>
    item.id === id ? { ...item, status: todoStatus.inProgress } : item
  )
  dropZoneInProgress.classList.remove('cards_in-progress_highlight')

  setTodoList(updatedTodosList)
  moveCardInProgress(id)
  setTodosCount()
  setInProgressCount()
})

const dropZoneToDo = document.getElementById('todo-cards')
dropZoneToDo.addEventListener('dragenter', (e) => {
  e.preventDefault()
  dropZoneToDo.classList.add('cards_todo_highlight')
})

dropZoneToDo.addEventListener('dragleave', () => {
  dropZoneToDo.classList.remove('cards_todo_highlight')
})
dropZoneToDo.addEventListener('dragover', (e) => {
  e.preventDefault()
})

dropZoneToDo.addEventListener('drop', (e) => {
  e.preventDefault()
  const id = e.dataTransfer.getData('text/plain')
  const todosList = getTodoList()
  const updatedTodosList = todosList.map((item) =>
    item.id === id ? { ...item, status: todoStatus.todo } : item
  )
  dropZoneToDo.classList.remove('cards_todo_highlight')

  setTodoList(updatedTodosList)
  moveCardToTodo(id)
  setTodosCount()
  setInProgressCount()
})

const dropZoneDone = document.getElementById('done-cards')
dropZoneDone.addEventListener('dragenter', (e) => {
  e.preventDefault()
  dropZoneDone.classList.add('cards_done_highlight')
})

dropZoneDone.addEventListener('dragleave', () => {
  dropZoneDone.classList.remove('cards_done_highlight')
})
dropZoneDone.addEventListener('dragover', (e) => {
  e.preventDefault()
})

dropZoneDone.addEventListener('drop', (e) => {
  e.preventDefault()
  const id = e.dataTransfer.getData('text/plain')
  const todosList = getTodoList()
  const updatedTodosList = todosList.map((item) =>
    item.id === id ? { ...item, status: todoStatus.done } : item
  )
  dropZoneDone.classList.remove('cards_done_highlight')
  const card = document.getElementById(id)
  card.classList.remove('draggable')

  setTodoList(updatedTodosList)
  moveCardToDone(id)
  setDoneCount()
  setInProgressCount()
})
