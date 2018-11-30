const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let todoCount = 0
let uncheckedCount = 0
let todoId = 0

function newTodo() {
  const todo = prompt('Create new TODO')
  if (todo === null) {
    return
  }
  list.appendChild(li(todo))

  todoCount++
  uncheckedCount++
  updateCounters()
}

function updateCounters() {
  itemCountSpan.innerText = todoCount;
  uncheckedCountSpan.innerText = uncheckedCount;
}

function li(todo) {
  const li = document.createElement('li')
  li.className = classNames.TODO_ITEM
  li.id = `todo-${todoId++}`
  li.appendChild(checkbox())
  li.appendChild(span(todo))
  li.appendChild(deleteBtn(li.id))
  return li
}

function checkbox() {
  const input = document.createElement('input')
  input.type = 'checkbox'
  input.onchange = function() {
    if (input.checked) {
      uncheckedCount--
    } else {
      uncheckedCount++
    }
    uncheckedCountSpan.innerText = uncheckedCount
    return true
  }
  input.className = classNames.TODO_CHECKBOX
  return input
}

function span(todo) {
  const span = document.createElement('span')
  span.className = classNames.TODO_TEXT
  span.innerText = todo
  return span
}

function deleteBtn(id) {
  const btn = document.createElement('button')
  btn.className = 'todo-delete'
  btn.innerText = 'Delete'
  btn.onclick = function() {
    const li = document.getElementById(id)
    todoCount--
    let checked = li.getElementsByTagName('input')[0].checked
    uncheckedCount = checked ? uncheckedCount : uncheckedCount - 1
    updateCounters()
    li.remove()
    return true
  }
  return btn
}
