import { USERS } from './common'
import { generateSelect } from './dom_helpers'

export async function getUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await response.json()

    localStorage.setItem(
      USERS,
      JSON.stringify(
        users.map((user) => {
          return { name: user.name, id: user.id }
        })
      )
    )
    generateSelect(users)
  } catch (error) {
    console.log(
      `Something went wrong, please try later. The error is ${error.message}`
    )
  }
}
