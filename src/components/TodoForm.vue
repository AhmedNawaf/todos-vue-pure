<script setup lang="ts">
import { ref } from 'vue'

const todo = ref('')
const error = ref('')
const emit = defineEmits(['addTodo'])

function addTodo() {
  if (!todo.value) {
    error.value = 'Please enter a todo'
    return
  }
  emit('addTodo', todo.value)
  todo.value = ''
}
</script>

<template>
  <form @submit.prevent="addTodo" class="max-w-xs w-full mx-auto">
    <div class="flex justify-center">
      <input
        class="bg-gray-200 text-gray-700 p-3 rounded-l-lg flex-1"
        type="text"
        v-model="todo"
        @change="error = ''"
        placeholder="Add todo"
      />
      <button type="submit" class="bg-blue-500 uppercase text-white px-4 py-2 rounded-r-lg">
        Add
      </button>
    </div>
    <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
  </form>
</template>
