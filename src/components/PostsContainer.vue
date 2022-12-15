<script setup>
const props = defineProps(['posts'])
</script>
<template>
    <div>
        <h2>Posts</h2>
        <div>
            <div v-for="post in props.posts" :key="post.id">
                <RouterLink :to='{ path: `/posts/${post.id}` }'>
                    {{ `${post.title} (${post.views} views) ` }}
                </RouterLink>
            </div>
        </div>
    </div>
</template>