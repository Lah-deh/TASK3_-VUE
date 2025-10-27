<template>
  <div class="register-page">
    <Toast v-if="toast.message" :message="toast.message" :type="toast.type" @close="toast.message = ''" />

    <Form @submit="handleSubmit" class="register-form">
      <Field name="email" type="email" placeholder="Email" />
      <ErrorMessage name="email" class="error" />

      <Field name="password" type="password" placeholder="Password" />
      <ErrorMessage name="password" class="error" />

      <Field name="fullName" type="text" placeholder="Full Name" />
      <ErrorMessage name="fullName" class="error" />

      <Field name="phone" type="text" placeholder="Phone Number" />
      <ErrorMessage name="phone" class="error" />

      <Field name="address" type="text" placeholder="Address" />
      <ErrorMessage name="address" class="error" />

      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? "Submitting..." : "Register" }}
      </button>
    </Form>

    <p>
      Already have an account? <RouterLink to="/login">Login</RouterLink>
    </p>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import axios from 'axios'
import { useForm, Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import Toast from '../components/ToastPage.vue'

const router = useRouter()
const toast = reactive({ message: '', type: '' })

// Validation schema
const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required.'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Password is required.'),
  fullName: yup.string().required('Full name is required.'),
  phone: yup.string().required('Phone number is required.'),
  address: yup.string().required('Address is required.'),
})

// Vee-validate form
const { handleSubmit: veeSubmit, errors, submitCount, isSubmitting, resetForm } = useForm({
  validationSchema: schema
})

// Show first validation error as toast
watch([errors, submitCount], () => {
  if (submitCount.value > 0 && Object.keys(errors.value).length > 0) {
    const firstError = Object.values(errors.value)[0]
    toast.message = firstError
    toast.type = 'error'
  }
})

// Axios instance
const api = axios.create({
  baseURL: 'https://mockdata-93rw.onrender.com'
})

// Handle form submit
const handleSubmit = veeSubmit(async (values) => {
  try {
    const res = await api.get('/users')
    const userExists = res.data.find(user => user.email === values.email)

    if (userExists) {
      toast.message = 'User already exists with this email.'
      toast.type = 'error'
      return
    }

    const response = await api.post('/users', { ...values, tickets: [] })
    localStorage.setItem('user', JSON.stringify(response.data))

    toast.message = 'Registration successful!'
    toast.type = 'success'

    setTimeout(() => router.push('/dashboard'), 1000)
    resetForm()
  } catch (err) {
    console.error(err)
    toast.message = 'Error submitting form. Please try again.'
    toast.type = 'error'
  }
})
</script>
