<template>
  <section>
    <Toast
      v-if="toast.message"
      :message="toast.message"
      :type="toast.type"
      @close="toast.message = ''"
    />

    <h2>New Ticket</h2>

    <Form @submit="submitForm">
      <article>
        <label for="title">Title</label>
        <Field id="title" name="title" type="text" />
        <ErrorMessage name="title" as="small" />
      </article>

      <article>
        <label for="description">Description</label>
        <Field as="textarea" id="description" name="description" rows="3" />
        <ErrorMessage name="description" as="small" />
      </article>

      <article>
        <label for="priority">Priority</label>
        <Field as="select" id="priority" name="priority">
          <option value="">Select</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </Field>
        <ErrorMessage name="priority" as="small" />
      </article>

      <article>
        <label for="status">Status</label>
        <Field as="select" id="status" name="status">
          <option value="">Select</option>
          <option value="Open">Open</option>
          <option value="Resolved">Resolved</option>
        </Field>
        <ErrorMessage name="status" as="small" />
      </article>

      <button type="submit">Create Ticket</button>
    </Form>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import axios from 'axios'
import { useForm, Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import Toast from '../components/ToastPage.vue'

const toast = reactive({ message: '', type: '' })
const user = JSON.parse(localStorage.getItem('user'))

const api = axios.create({
  baseURL: 'https://mockdata-93rw.onrender.com',
})

const schema = yup.object({
  title: yup.string().required('Title is required.'),
  description: yup.string().required('Description is required.'),
  priority: yup.string().required('Priority is required.'),
  status: yup.string().required('Status is required.'),
})

const { handleSubmit: submitForm } = useForm({
  validationSchema: schema,
  initialValues: {
    title: '',
    description: '',
    priority: '',
    status: '',
  },
  onSubmit: async (values, { resetForm }) => {
    if (!user) {
      toast.message = 'You must be logged in to create a ticket.'
      toast.type = 'error'
      return
    }

    const newTicket = {
      id: Math.random().toString(36).slice(2, 6),
      ...values,
      createdAt: new Date().toISOString(),
    }

    try {
      const res = await api.get(`/users/${user.id}`)
      const updatedUser = {
        ...res.data,
        tickets: [...(res.data.tickets || []), newTicket],
      }
      await api.put(`/users/${user.id}`, updatedUser)
      toast.message = 'Ticket created successfully!'
      toast.type = 'success'
      resetForm()
    } catch (err) {
      console.error(err)
      toast.message = 'Error saving ticket.'
      toast.type = 'error'
    }
  },
})
</script>
