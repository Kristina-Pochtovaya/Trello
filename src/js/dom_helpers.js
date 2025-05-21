import { getTodoList } from './local_storage_helpers'
import { todoStatus } from './common'

import {
  moveInProgressBtnHandler,
  completeBtnHandler,
  deleteBtnHandler,
  editBtnHandler,
  backBtnHandler,
} from './handlers'

export function createDate() {
  const timer = document.getElementById('timer')
  const content = document.createElement('p')

  content.textContent = new Date().toLocaleTimeString()
  timer.appendChild(content)
}

export function setTodosCount() {
  const todosCount = document.getElementById('todos_count')
  todosCount.textContent = getTodoList().filter(
    (item) => item.status === todoStatus.todo
  ).length
}

export function setInProgressCount() {
  const todosCount = document.getElementById('in-progress_count')
  todosCount.textContent = getTodoList().filter(
    (item) => item.status === todoStatus.inProgress
  ).length
}

export function setDoneCount() {
  const todosCount = document.getElementById('done_count')
  todosCount.textContent = getTodoList().filter(
    (item) => item.status === todoStatus.done
  ).length
}

export function generateCard(todo) {
  const todoCards = document.getElementById('todo-cards')
  const card = document.createElement('div')
  card.classList.add('cards__content', 'cards__content_todo', 'draggable')
  card.setAttribute('id', todo.id)
  card.classList.add()
  card.setAttribute('draggable', true)
  todoCards.appendChild(card)

  card.addEventListener('dragstart', (e) => {
    console.log(!card.classList.contains('cards__content_done'))
    if (!card.classList.contains('cards__content_done')) {
      e.dataTransfer.setData('text/plain', todo.id)
    }
  })

  const firstRow = document.createElement('div')
  firstRow.classList.add('cards__first-row')
  firstRow.setAttribute('id', 'first-row')
  card.appendChild(firstRow)
  const title = document.createElement('p')
  title.setAttribute('id', 'first-row-title')
  title.textContent = todo.title
  firstRow.appendChild(title)
  const controls = document.createElement('div')
  controls.classList.add('first-row__controls')
  firstRow.appendChild(controls)

  const editBtn = document.createElement('button')
  editBtn.classList.add('first-row__edit-btn')
  editBtn.setAttribute('id', `first-row-edit-btn ${todo.id}`)
  editBtn.textContent = 'EDIT'
  controls.appendChild(editBtn)

  const editBtns = document.querySelectorAll('.first-row__edit-btn')
  editBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => editBtnHandler(e))
  })

  const deliteBtn = document.createElement('button')
  deliteBtn.classList.add('first-row__delite-btn')
  deliteBtn.setAttribute('id', `first-row-delite-btn ${todo.id}`)
  deliteBtn.textContent = 'DELITE'
  controls.appendChild(deliteBtn)

  const deliteBtns = document.querySelectorAll('.first-row__delite-btn')
  deliteBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => deleteBtnHandler(e))
  })

  const backBtn = document.createElement('button')
  backBtn.classList.add('first-row__back-btn', 'first-row__back-btn_hidden')
  backBtn.setAttribute('id', `first-row-back-btn ${todo.id}`)
  backBtn.textContent = 'BACK'
  controls.appendChild(backBtn)

  const backBtns = document.querySelectorAll('.first-row__back-btn')
  backBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => backBtnHandler(e))
  })

  const completeBtn = document.createElement('button')
  completeBtn.classList.add(
    'first-row__complete-btn',
    'first-row__complete-btn_hidden'
  )
  completeBtn.setAttribute('id', `first-row-complete-btn ${todo.id}`)
  completeBtn.textContent = 'COMPLETE'
  controls.appendChild(completeBtn)

  const completeBtns = document.querySelectorAll('.first-row__complete-btn')
  completeBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => completeBtnHandler(e))
  })

  const secondRow = document.createElement('div')
  secondRow.classList.add('cards__second-row')
  secondRow.setAttribute('id', 'second-row')
  card.appendChild(secondRow)
  const description = document.createElement('p')
  description.setAttribute('id', 'second-row-description')
  description.textContent = todo.description
  secondRow.appendChild(description)
  const moveBtn = document.createElement('button')
  moveBtn.classList.add('second-row__move-btn')
  moveBtn.setAttribute('id', `movebtn ${todo.id}`)
  const chevronIcon = document.createElement('i')
  chevronIcon.classList.add('fa-solid', 'fa-chevron-right')
  moveBtn.appendChild(chevronIcon)
  secondRow.appendChild(moveBtn)

  const moveInProgressBtns = document.querySelectorAll('.second-row__move-btn')
  moveInProgressBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => moveInProgressBtnHandler(e))
  })

  const thirdRow = document.createElement('div')
  thirdRow.classList.add('cards__third-row')
  thirdRow.setAttribute('id', 'third-row')
  card.appendChild(thirdRow)
  const user = document.createElement('p')
  user.setAttribute('id', 'third-row-user')
  user.textContent = todo.user
  thirdRow.appendChild(user)
  const time = document.createElement('p')
  time.setAttribute('id', 'third-row-time')
  time.textContent = todo.createTime
  thirdRow.appendChild(time)

  setTodosCount()
}

export function moveCardInProgress(id) {
  const inProgressCards = document.getElementById('in-progress-cards')
  const card = document.getElementById(id)
  inProgressCards.append(card)

  card.classList.remove('cards__content_todo')
  card.classList.add('cards__content_in-progress')

  const controls = card.querySelector('.first-row__controls')
  const editBtn = controls.querySelector('.first-row__edit-btn')
  editBtn.classList.add('first-row__edit-btn_hidden')
  const deliteBtn = controls.querySelector('.first-row__delite-btn')
  deliteBtn.classList.add('first-row__delite-btn_hidden')
  const backBtn = controls.querySelector('.first-row__back-btn')
  backBtn.classList.remove('first-row__back-btn_hidden')
  const completeBtn = controls.querySelector('.first-row__complete-btn')
  completeBtn.classList.remove('first-row__complete-btn_hidden')

  const secondRow = card.querySelector('.cards__second-row')
  const moveBtn = secondRow.querySelector('.second-row__move-btn')
  moveBtn.classList.add('second-row__move-btn_hidden')
}

export function moveCardToTodo(id) {
  const todoCards = document.getElementById('todo-cards')
  const card = document.getElementById(id)
  todoCards.append(card)

  card.classList.remove('cards__content_in-progress')
  card.classList.add('cards__content_todo')

  const controls = card.querySelector('.first-row__controls')
  const editBtn = controls.querySelector('.first-row__edit-btn')
  editBtn.classList.remove('first-row__edit-btn_hidden')
  const deliteBtn = controls.querySelector('.first-row__delite-btn')
  deliteBtn.classList.remove('first-row__delite-btn_hidden')
  const backBtn = controls.querySelector('.first-row__back-btn')
  backBtn.classList.add('first-row__back-btn_hidden')
  const completeBtn = controls.querySelector('.first-row__complete-btn')
  completeBtn.classList.add('first-row__complete-btn_hidden')

  const secondRow = card.querySelector('.cards__second-row')
  const moveBtn = secondRow.querySelector('.second-row__move-btn')
  moveBtn.classList.remove('second-row__move-btn_hidden')
}

export function moveCardToDone(id) {
  const doneCards = document.getElementById('done-cards')
  const card = document.getElementById(id)
  doneCards.append(card)

  card.classList.remove('cards__content_todo')
  card.classList.add('cards__content_done')
  card.classList.remove('draggable')
  card.setAttribute('draggable', false)

  const controls = card.querySelector('.first-row__controls')
  const deliteBtn = controls.querySelector('.first-row__delite-btn')
  deliteBtn.classList.remove('first-row__delite-btn_hidden')
  const backBtn = controls.querySelector('.first-row__back-btn')
  backBtn.classList.add('first-row__back-btn_hidden')
  const editBtn = controls.querySelector('.first-row__edit-btn')
  editBtn.classList.add('first-row__edit-btn_hidden')
  const completeBtn = controls.querySelector('.first-row__complete-btn')
  completeBtn.classList.add('first-row__complete-btn_hidden')

  const secondRow = card.querySelector('.cards__second-row')
  const moveBtn = secondRow.querySelector('.second-row__move-btn')
  moveBtn.classList.add('second-row__move-btn_hidden')
}

export function generateSelect(options) {
  const select = document.getElementById('add-todo__users')

  options.forEach((optionValue) => {
    const option = document.createElement('option')
    option.value = optionValue.id
    option.textContent = optionValue.name
    select.appendChild(option)
  })
}

export function handleOnDOMContentLoaded() {
  const todoList = getTodoList()

  if (todoList.length === 0) {
    return
  }

  todoList
    .filter((item) => item.status === todoStatus.todo)
    .forEach((todo) => generateCard(todo))

  todoList
    .filter((item) => item.status === todoStatus.inProgress)
    .forEach((todo) => {
      generateCard(todo)
      moveCardInProgress(todo.id)
    })

  todoList
    .filter((item) => item.status === todoStatus.done)
    .forEach((todo) => {
      generateCard(todo)
      moveCardToDone(todo.id)
    })

  setTodosCount()
  setInProgressCount()
  setDoneCount()
}
