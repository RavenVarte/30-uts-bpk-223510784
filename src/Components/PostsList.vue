<template>
  <div class="post-container">
    <h2 class="text-center">Postingan</h2>

    <select v-model="selectedUser" @change="handleUserChange">
      <option :value="null">Pilih Pengguna</option>
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>

    <div v-if="selectedUser !== null" class="post-list">
      <q-card v-for="post in filteredPosts" :key="post.id" class="post-item">
        <q-card-section>
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </q-card-section>
      </q-card>
    </div>
    <div v-else>
      <p class="text-center">Silakan pilih pengguna untuk melihat postingan mereka.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'

const users = ref([])
const posts = ref([])
const selectedUser = ref(null)

const fetchUsers = () => {
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      users.value = response.data
    })
    .catch(error => {
      console.error('Error fetching users:', error)
    })
}

const fetchPosts = () => {
  axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
      posts.value = response.data
    })
    .catch(error => {
      console.error('Error fetching posts:', error)
    })
}

const filteredPosts = computed(() => {
  if (selectedUser.value === null) {
    return []
  } else {
    return posts.value.filter(post => post.userId === selectedUser.value)
  }
})

fetchUsers()
fetchPosts()

const handleUserChange = () => {
  if (selectedUser.value !== null) {
    const user = users.value.find(u => u.id === selectedUser.value)
    Swal.fire({
      icon: 'info',
      title: 'Informasi Pengguna Dipilih',
      text: `Anda memilih pengguna: ${user.name}`,
    })
  }
}
</script>

<style scoped>
.post-container {
  text-align: center;
}

.post-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.post-item {
  width: 60%;
  margin-bottom: 20px;
}

.text-center {
  text-align: center;
}
</style>
