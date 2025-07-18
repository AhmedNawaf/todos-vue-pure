<script setup lang="ts">
import useAuth from '@/composables/useAuth'

const links = [
  { name: 'Todos', to: '/' },
  { name: 'About', to: '/about' },
]

const { isAuthenticated, logout } = useAuth()
</script>

<template>
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex shrink-0 items-center">
            <RouterLink to="/" class="text-4xl">📝</RouterLink>
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <RouterLink
                v-for="link in links"
                :key="link.name"
                :to="link.to"
                class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                exact-active-class="bg-gray-900 text-white"
                >{{ link.name }}</RouterLink
              >
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-4"
        >
          <template v-if="!isAuthenticated">
            <RouterLink
              to="/register"
              class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white"
            >
              Register
            </RouterLink>
            <RouterLink
              to="/login"
              class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white"
            >
              Login
            </RouterLink>
          </template>
          <template v-else>
            <button
              @click="logout"
              class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white cursor-pointer"
            >
              Logout
            </button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>
