<script setup>
const props = defineProps(['authors'])
</script>
<template>
    <div>
        <h2>Authors</h2>
        <div>
            <div v-for="author in props.authors" :key="author.id">
                <RouterLink :to='{ path: `/authors/${author.id}` }'>
                    {{ author.name }}
                </RouterLink>
            </div>
        </div>
    </div>
</template>