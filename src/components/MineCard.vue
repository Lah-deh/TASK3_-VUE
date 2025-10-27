<template>
  <div class="ticket-container">
    <Toast v-if="toast.message" :message="toast.message" :type="toast.type" @close="toast.message = ''" />

    <h2>My Tickets</h2>

    <div class="ticket-grid">
      <p v-if="tickets.length === 0">No tickets found.</p>
      <div v-else v-for="ticket in tickets" :key="ticket.id" class="ticket-card">
        <div v-if="editingId === ticket.id">
          <input v-model="editedTicket.title" class="edit-input" />
          <textarea v-model="editedTicket.description" rows="3" class="edit-input" />
          <select v-model="editedTicket.priority">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <select v-model="editedTicket.status">
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          <div class="card-actions">
            <button @click="handleSave(ticket.id)">Save</button>
            <button @click="cancelEdit">Cancel</button>
          </div>
        </div>

        <div v-else>
          <h3>{{ ticket.title }}</h3>
          <p>{{ ticket.description }}</p>
          <p><strong>Priority:</strong> {{ ticket.priority }}</p>
          <p><strong>Status:</strong> {{ ticket.status }}</p>
          <p class="timestamp">{{ new Date(ticket.createdAt).toLocaleString() }}</p>

          <div class="card-actions">
            <button @click="handleEdit(ticket)">Edit</button>
            <button @click="handleDelete(ticket.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'
import Toast from './ToastPage.vue'

const toast = reactive({ message: '', type: '' })
const tickets = ref([])
const editingId = ref(null)
const editedTicket = reactive({})

const user = JSON.parse(localStorage.getItem('user'))

const api = axios.create({
  baseURL: 'https://mockdata-93rw.onrender.com'
})

onMounted(async () => {
  if (!user) return
  try {
    const res = await api.get(`/users/${user.id}`)
    tickets.value = res.data.tickets || []
  } catch (error) {
    console.error(error)
    toast.message = 'Failed to load tickets.'
    toast.type = 'error'
  }
})

const handleDelete = async (id) => {
  if (!confirm('Are you sure you want to delete this ticket?')) return

  try {
    const res = await api.get(`/users/${user.id}`)
    const updatedTickets = res.data.tickets.filter(t => t.id !== id)
    await api.put(`/users/${user.id}`, { ...res.data, tickets: updatedTickets })
    tickets.value = updatedTickets
    toast.message = 'Ticket deleted successfully!'
    toast.type = 'success'
  } catch (error) {
    console.error(error)
    toast.message = 'Error deleting ticket.'
    toast.type = 'error'
  }
}

const handleEdit = (ticket) => {
  editingId.value = ticket.id
  Object.assign(editedTicket, ticket)
}

const handleSave = async (id) => {
  try {
    const res = await api.get(`/users/${user.id}`)
    const updatedTickets = res.data.tickets.map(t => t.id === id ? editedTicket : t)
    await api.put(`/users/${user.id}`, { ...res.data, tickets: updatedTickets })
    tickets.value = updatedTickets
    editingId.value = null
    toast.message = 'Ticket updated successfully!'
    toast.type = 'success'
  } catch (error) {
    console.error(error)
    toast.message = 'Error saving ticket.'
    toast.type = 'error'
  }
}

const cancelEdit = () => {
  editingId.value = null
}
</script>
