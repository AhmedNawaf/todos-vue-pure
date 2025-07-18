<script setup lang="ts">
import useAuth from '@/composables/useAuth'
import { reactive } from 'vue'

const { login } = useAuth()
const form = reactive({
  email: '',
  password: '',
})

const formErrorMsg = reactive({
  email: '',
  password: '',
})

function validateForm() {
  // @ts-expect-error: Long fix to solve the error
  Object.keys(formErrorMsg).forEach((key) => (formErrorMsg[key] = ''))

  if (!form.email) {
    formErrorMsg.email = 'Email is required'
  } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
    formErrorMsg.email = 'Email is invalid'
  }

  if (!form.password) {
    formErrorMsg.password = 'Password is required'
  }

  return Object.values(formErrorMsg).every((msg) => !msg)
}

function handleSubmit() {
  if (!validateForm()) return
  login(form.email, form.password)
}
</script>

<template>
  <h1 class="text-3xl font-bold italic text-center">Login</h1>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 max-w-md mx-auto mt-10">
    <div class="flex flex-col gap-2">
      <label for="email" class="text-sm font-medium">Email</label>
      <input
        id="email"
        type="email"
        class="bg-gray-200 text-gray-700 p-3 rounded-lg"
        placeholder="Enter your email"
        v-model="form.email"
      />
      <p v-if="formErrorMsg.email" class="text-red-500 text-sm">{{ formErrorMsg.email }}</p>
    </div>
    <div class="flex flex-col gap-2">
      <label for="password" class="text-sm font-medium">Password</label>
      <input
        id="password"
        type="password"
        class="bg-gray-200 text-gray-700 p-3 rounded-lg"
        placeholder="Enter your password"
        v-model="form.password"
      />
      <p v-if="formErrorMsg.password" class="text-red-500 text-sm">{{ formErrorMsg.password }}</p>
    </div>

    <div class="flex justify-center">
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg">Login</button>
    </div>
  </form>
</template>
