<script setup lang="ts">
import useAuth from '@/composables/useAuth'
import { getItem } from '@/utils/localStorage'
import { reactive } from 'vue'

const { register } = useAuth()
const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const formErrorMsg = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

function validateForm() {
  // @ts-expect-error: Long fix to solve the error
  Object.keys(formErrorMsg).forEach((key) => (formErrorMsg[key] = ''))

  const duplicateEmail = getItem('users')?.find((user) => user.email === form.email)

  if (!form.name.trim()) {
    formErrorMsg.name = 'Name is required'
  } else if (form.name.length < 3) {
    formErrorMsg.name = 'Name must be at least 3 characters'
  }

  if (!form.email) {
    formErrorMsg.email = 'Email is required'
  } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
    formErrorMsg.email = 'Email is invalid'
  } else if (duplicateEmail) {
    formErrorMsg.email = 'Email already exists'
  }

  if (!form.password) {
    formErrorMsg.password = 'Password is required'
  }
  if (!form.confirmPassword) {
    formErrorMsg.confirmPassword = 'Confirm Password is required'
  }

  if (form.password.length < 8) {
    formErrorMsg.password = 'Password must be at least 8 characters'
  } else if (form.password !== form.confirmPassword) {
    formErrorMsg.confirmPassword = 'Passwords do not match'
  }

  return Object.values(formErrorMsg).every((msg) => !msg)
}

async function handleSubmit() {
  if (!validateForm()) return
  register(form.name, form.email, form.password)
}
</script>

<template>
  <h1 class="text-3xl font-bold italic text-center">Register</h1>
  <form class="flex flex-col gap-4 max-w-md mx-auto mt-10" @submit.prevent="handleSubmit">
    <div class="flex flex-col gap-2">
      <label for="name" class="text-sm font-medium">Name</label>
      <input
        id="name"
        type="text"
        class="bg-gray-200 text-gray-700 p-3 rounded-lg"
        :class="{ 'border-red-500': formErrorMsg.name }"
        placeholder="Enter your name"
        v-model="form.name"
      />
      <p v-if="formErrorMsg.name" class="text-red-500 text-sm">{{ formErrorMsg.name }}</p>
    </div>
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
    <div class="flex flex-col gap-2">
      <label for="confirm-password" class="text-sm font-medium"> Confirm Password </label>
      <input
        id="confirm-password"
        type="password"
        class="bg-gray-200 text-gray-700 p-3 rounded-lg"
        placeholder="Confirm your password"
        v-model="form.confirmPassword"
      />
      <p v-if="formErrorMsg.confirmPassword" class="text-red-500 text-sm">
        {{ formErrorMsg.confirmPassword }}
      </p>
    </div>
    <div class="flex justify-center">
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer">
        Register
      </button>
    </div>
  </form>
</template>
