<script setup lang="ts">
import TodosManager from '@/components/todo/TodosManager.vue'
</script>

<template>
  <h1 class="text-3xl font-bold italic text-center mt-20">Todo App</h1>
  <h2 class="text-sm font-light italic text-center mt-2">
    This is a simple todo app built with Vue 3.<br />
    It uses local storage to store the todos.
  </h2>
  <TodosManager />
</template>
