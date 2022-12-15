<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <nav class="d-inline-flex gap-2em pa-5">
      <RouterLink to="/">
        <div>
          About
        </div>
      </RouterLink>
      <v-divider vertical></v-divider>
      <RouterLink to="/posts">
        <div>
          Posts
        </div>
      </RouterLink>
    </nav>
    <RouterView class="pa-5" />
  </div>
</template>
