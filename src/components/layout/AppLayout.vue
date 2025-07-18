<script setup lang="ts">
import NavBar from './NavBar.vue'
</script>

<template>
  <NavBar />
  <main class="max-w-lg mx-auto h-screen mt-20">
    <slot />
  </main>
  <footer class="bg-gray-800 p-4 text-center">
    <p class="text-sm text-gray-400">&copy; 2025 Vue Learning</p>
  </footer>
</template>
