<template>
  <div class="album-container">
    <h2>Albums</h2>
    <div class="album-grid">
      <div v-for="photo in photos" :key="photo.id" class="photo-item">
        <img :src="photo.thumbnailUrl" @click="viewPhoto(photo.id)" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const photos = ref([])
    const router = useRouter()

    const fetchPhotos = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=24')
      photos.value = await response.json()
    }

    const viewPhoto = (id) => {
      router.push(`/albums/${id}`)
    }

    onMounted(() => {
      fetchPhotos()
    })

    return {
      photos,
      viewPhoto
    }
  }
}
</script>

<style scoped>
.album-container {
  text-align: center;
  padding: 20px;
}

.album-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center; 
}

.photo-item {
  text-align: center;
}

.photo-item img {
  width: 150px;
  height: 150px;
  cursor: pointer;
}
</style>
