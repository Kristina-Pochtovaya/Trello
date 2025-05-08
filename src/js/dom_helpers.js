export function createDate() {
  const timer = document.getElementById('timer')
  const content = document.createElement('p')

  content.textContent = new Date().toLocaleTimeString()
  timer.appendChild(content)
}

export function generateCard(todo) {
  const todoCards = document.getElementById('todo-cards')
  const card = document.createElement('div')
  card.classList.add('cards__content')
  card.setAttribute('id', todo.id)
  todoCards.appendChild(card)

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
  editBtn.setAttribute('id', 'first-row-edit-btn')
  editBtn.textContent = 'EDIT'
  firstRow.appendChild(editBtn)
  const deliteBtn = document.createElement('button')
  deliteBtn.classList.add('first-row__delite-btn')
  deliteBtn.setAttribute('id', 'first-row-delite-btn')
  deliteBtn.textContent = 'DELITE'
  firstRow.appendChild(deliteBtn)

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
  moveBtn.setAttribute('id', 'second-row-move-btn')
  const chevronIcon = document.createElement('i')
  chevronIcon.classList.add('fa-solid', 'fa-chevron-right')
  moveBtn.appendChild(chevronIcon)
  secondRow.appendChild(moveBtn)

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
  time.textContent = todo.time
  thirdRow.appendChild(time)
}

export function handleOnDOMContentLoaded() {
  const localStorageTodoList =
    JSON.parse(localStorage.getItem('todoList')) ?? []

  if (localStorageTodoList.length === 0) {
    return
  }

  localStorageTodoList.forEach((todo) => generateCard(todo))
}
