import useLocalStorage from './useLocalStorage'

export interface Todo {
  id: string
  title: string
  completed: boolean
}

export default function useTodos() {
  const todos = useLocalStorage<Todo[]>('todos', [])

  function addTodo(title: string) {
    todos.value.push({
      id: Date.now().toString(),
      title,
      completed: false,
    })
  }

  function toggleTodo(id: string) {
    const t = todos.value.find((todo) => todo.id === id)
    if (t) t.completed = !t.completed
  }

  function deleteTodo(id: string) {
    todos.value = todos.value.filter((todo) => todo.id !== id)
  }

  function editTodo(id: string, title: string) {
    todos.value = todos.value.map((todo) => (todo.id === id ? { ...todo, title } : todo))
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
  }
}
