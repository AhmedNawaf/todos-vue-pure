import useLocalStorage from './useLocalStorage'

export interface Todo {
  id: number
  title: string
  completed: boolean
}

export default function useTodos() {
  const todos = useLocalStorage<Todo[]>('todos', [])

  function addTodo(value: string) {
    todos.value.push({
      id: todos.value.length + 1,
      title: value,
      completed: false,
    })
  }

  function markTodo(id: number) {
    todos.value.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
    })
  }

  function deleteTodo(id: number) {
    todos.value = todos.value.filter((todo) => todo.id !== id)
  }

  function editTodo(id: number, value: string) {
    console.log(id, value)
    todos.value = todos.value.map((todo) => {
      if (todo.id === id) {
        todo.title = value
      }
      return todo
    })
  }
  return {
    todos,
    addTodo,
    markTodo,
    deleteTodo,
    editTodo,
  }
}
