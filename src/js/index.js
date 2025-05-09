import { createDate } from './dom_helpers'
import {
  addTodoBtnHandler,
  cancelBtnHandler,
  confirmBtnHandler,
  deleteAllBtnHandler,
} from './handlers'
import { handleOnDOMContentLoaded } from './dom_helpers'

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
