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
import { todoStatus, USERS } from './common'

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
  const itemToEdit = document.querySelector('.content_todo_edit') || []
  const select = document.getElementById('add-todo__users')

  todoTitle.value = ''
  todoDescription.value = ''
  select.value = ''
  addTodoModalWindow.classList.add('add-todo_hidden')
  itemToEdit.classList.remove('content_todo_edit')
}

export function deleteBtnHandler(e) {
  const todoId = e.target.id.split(' ')[1]
  const todosList = getTodoList()
  const updatedTodoList = todosList.filter((item) => item.id !== todoId)

  const itemToDelete = document.getElementById(todoId)
  itemToDelete.classList.add('content_todo_hidden')

  setTodoList(updatedTodoList)
  setTodosCount()
}

export function editBtnHandler(e) {
  const todoId = e.target.id.split(' ')[1]
  const todosList = getTodoList()

  const todo = todosList.find((item) => item.id === todoId)
  const itemToEdit = document.getElementById(todoId)
  itemToEdit.classList.add('content_todo_edit')

  const addTodoModalWindow = document.getElementById('add-todo-modal-window')
  addTodoModalWindow.classList.remove('add-todo_hidden')
  const addTodoModalWindowTitle = document.getElementById(
    'add-todo__title_input'
  )
  addTodoModalWindowTitle.value = todo.title

  const addTodoModalWindowDescription = document.getElementById(
    'add-todo__description_input'
  )
  addTodoModalWindowDescription.value = todo.description

  const select = document.getElementById('add-todo__users')
  const users = JSON.parse(localStorage.getItem(USERS))
  const userIdToEdit = users.find((user) => user.name == todo.user).id || ''

  select.value = userIdToEdit
}

export function confirmBtnHandler() {
  const todoTitle = document.getElementById('add-todo__title_input')
  const todoDescription = document.getElementById('add-todo__description_input')
  const addTodoModalWindow = document.getElementById('add-todo-modal-window')
  const select = document.getElementById('add-todo__users')
  const users = JSON.parse(localStorage.getItem(USERS))
  const userNameToAdd = users.find((user) => user.id == select.value).name || ''

  const itemToEdit = document.querySelector('.content_todo_edit')
  if (itemToEdit) {
    const todosList = getTodoList()

    const updatedTodosList = todosList.map((item) =>
      item.id === itemToEdit.id
        ? {
            ...item,
            title: todoTitle.value,
            description: todoDescription.value,
            user: userNameToAdd,
          }
        : item
    )

    const itemToEditTitle = itemToEdit.querySelector('#first-row-title')
    itemToEditTitle.textContent = todoTitle.value
    const itemToEditDescription = itemToEdit.querySelector(
      '#second-row-description'
    )
    itemToEditDescription.textContent = todoDescription.value
    const itemToEditUserName = itemToEdit.querySelector('#third-row-user')
    itemToEditUserName.textContent = userNameToAdd
    setTodoList(updatedTodosList)

    itemToEdit.classList.remove('content_todo_edit')
  } else {
    const todo = {
      id: generateId(),
      createTime: new Date().toLocaleTimeString(),
      title: todoTitle.value,
      description: todoDescription.value,
      user: userNameToAdd,
      status: todoStatus.todo,
    }

    select.value = ''
    const todoList = getTodoList()
    todoList.push(todo)
    setTodoList(todoList)

    generateCard(todo)
  }

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

export function searchInputHandler(searchString) {
  const todosList = getTodoList()
  const updatedTodoList = todosList.filter(
    (item) =>
      !item.title.includes(searchString.trim()) &&
      !item.description.includes(searchString.trim())
  )

  updatedTodoList.forEach((todo) => {
    const notFoundItem = document.getElementById(todo.id)
    notFoundItem.classList.add('todo-item-not-found')
  })
}

export function searchInputClearHandler() {
  const searchInput = document.getElementById('search-input')
  searchInput.value = ''

  const notFoundItems = document.querySelectorAll('.todo-item-not-found')
  notFoundItems.forEach((item) => item.classList.remove('todo-item-not-found'))
}
