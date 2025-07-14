<script setup lang="ts">
import useTodos from '@/composables/useTodos'
import TodoForm from './TodoForm.vue'
import TodoCard from './TodoCard.vue'
const {
  all,
  counts,
  current,
  paginatedItems,
  totalPages,
  setPage,
  page,
  setFilter,
  clearAll,
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
} = useTodos()
</script>

<template>
  <div class="flex flex-col gap-4 mt-10">
    <TodoForm @add-todo="addTodo" />
  </div>
  <div class="flex flex-col max-w-lg mx-auto gap-4 mt-20">
    <p class="text-sm font-medium italic text-center mt-2" v-if="current.length">
      Total Pages : {{ totalPages }}
    </p>

    <div class="flex items-center justify-between gap-4" v-if="all.length">
      <div class="flex gap-4">
        <button
          class="hover:underline hover:text-blue-500 cursor-pointer"
          @click="setFilter('all')"
        >
          All: {{ counts.all }}
        </button>
        <button
          class="hover:underline hover:text-blue-500 cursor-pointer"
          @click="setFilter('completed')"
        >
          Completed: {{ counts.completed }}
        </button>
        <button
          class="hover:underline hover:text-blue-500 cursor-pointer"
          @click="setFilter('incompleted')"
        >
          Incompleted: {{ counts.incompleted }}
        </button>
      </div>
      <button
        class="border border-blue-500 bg-blue-400/90 text-white px-4 py-2 cursor-pointer font-semibold uppercase rounded-lg"
        @click="clearAll"
      >
        Clear All
      </button>
    </div>
    <TodoCard
      v-for="todo in paginatedItems"
      :key="todo.id"
      :todo="todo"
      @toggle-todo="toggleTodo"
      @edit-todo="editTodo"
      @delete-todo="deleteTodo"
    />
    <div class="flex justify-center space-x-6" v-if="totalPages > 1">
      <button
        class="border bg-blue-500 text-white px-4 py-2 cursor-pointer font-semibold uppercase rounded-lg"
        @click="setPage(page - 1)"
      >
        Previous
      </button>
      <button
        class="border bg-blue-500 text-white px-4 py-2 cursor-pointer font-semibold uppercase rounded-lg"
        @click="setPage(page + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>
