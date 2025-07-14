import useLocalStorage from './useLocalStorage'
import { computed, ref } from 'vue'
import { usePagination } from './usePagination'

export interface Todo {
  id: string
  title: string
  completed: boolean
}
const filters: Record<TodoFilter, (list: Todo[]) => Todo[]> = {
  all: (list) => list,
  completed: (list) => list.filter((t) => !t.completed),
  incompleted: (list) => list.filter((t) => t.completed),
}
type TodoFilter = 'all' | 'completed' | 'incompleted'

export default function useTodos() {
  const todos = useLocalStorage<Todo[]>('todos', [])
  const filter = ref<TodoFilter>('all')

  const currentTodos = computed(() => filters[filter.value](todos.value))
  const counts = computed(() => ({
    all: todos.value.length,
    completed: filters.completed(todos.value).length,
    incompleted: filters.incompleted(todos.value).length,
    current: currentTodos.value.length,
  }))

  function setFilter(f: TodoFilter) {
    setPage(1)
    filter.value = f
  }

  function clearAll() {
    todos.value = []
  }

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

  const {
    page,
    pageSize,
    totalItems,
    totalPages,
    paginatedItems, // <-- here’s your “current page” slice
    setPage,
    setPageSize,
  } = usePagination(currentTodos, /* initialPageSize= */ 5)

  return {
    all: todos,
    setFilter,
    current: currentTodos,
    page,
    pageSize,
    totalItems,
    totalPages,
    paginatedItems,
    setPage,
    setPageSize,
    counts,
    clearAll,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
  }
}
