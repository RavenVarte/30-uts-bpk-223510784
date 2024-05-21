<template>
  <div>
    <h2>Postingan</h2>
    <select :value="selectedUser" @change="updateSelectedUser">
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>
    <div v-if="selectedUser">
      <div v-for="post in filteredPosts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </div>
    </div>
    <div v-else>
      <p>Silakan pilih pengguna untuk melihat postingan mereka.</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    users: Array,
    posts: Array,
    selectedUser: Number
  },
  computed: {
    filteredPosts() {
      return this.posts.filter(post => post.userId === this.selectedUser);
    }
  },
  methods: {
    updateSelectedUser(event) {
      this.$emit('update:selectedUser', parseInt(event.target.value));
    }
  }
}
</script>

<style scoped>
/* Masukkan style yang relevan untuk PostsList di sini */
</style>
