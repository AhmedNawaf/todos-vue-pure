<script setup lang="ts">
import TodoForm from './components/TodoForm.vue'
import TodoCard from './components/TodoCard.vue'
import useTodos from './composables/useTodos'

const { all, counts, current, setFilter, clearAll, addTodo, toggleTodo, deleteTodo, editTodo } =
  useTodos()
</script>

<template>
  <h1 class="text-3xl font-bold italic text-center mt-20">Todo App</h1>
  <h2 class="text-sm font-light italic text-center mt-2">
    This is a simple todo app built with Vue 3.<br />
    It uses local storage to store the todos.
  </h2>
  <div class="flex flex-col gap-4 mt-10">
    <TodoForm @add-todo="addTodo" />
  </div>
  <div class="flex flex-col max-w-lg mx-auto gap-4 mt-20">
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
      v-for="todo in current"
      :key="todo.id"
      :todo="todo"
      @toggle-todo="toggleTodo"
      @edit-todo="editTodo"
      @delete-todo="deleteTodo"
    />
  </div>
</template>
