<template>
  <div class="photo-details">
    <button @click="goBack">Back</button>
    <q-card class="q-pa-md" style="max-width: 600px; margin: auto;">
      <q-card-section class="q-pa-none">
        <div v-if="photo" class="photo-container">
          <img :src="photo.url" />
        </div>
        <div v-else>
          <p>Loading...</p>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const photo = ref(null)
    const route = useRoute()
    const router = useRouter()

    const fetchPhoto = async (id) => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
      photo.value = await response.json()
    }

    const goBack = () => {
      router.back()
    }

    onMounted(() => {
      fetchPhoto(route.params.id)
    })

    return {
      photo,
      goBack
    }
  }
}
</script>

<style scoped>
.photo-details {

  padding: 20px;
}

.photo-container {
  margin-top: 20px;
}

img {
  max-width: 100%;
  height: auto;
}

button{
  align-items: start;
}
</style>
