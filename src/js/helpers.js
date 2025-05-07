export function createDate() {
  const timer = document.getElementById('timer')
  const content = document.createElement('p')

  content.textContent = new Date().toLocaleTimeString()
  timer.appendChild(content)
}
