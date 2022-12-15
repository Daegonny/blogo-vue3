<script setup>
const props = defineProps(['tags'])
</script>
<template>
    <div>
        <h2>Tags</h2>
        <div class="d-flex gap-1em">
            <div v-for="tag in props.tags" :key="tag.id">
                <RouterLink :to='{ path: `/tags/${tag.id}` }'>
                    <v-chip label variant="outlined">
                        {{ tag.name }}
                    </v-chip>
                </RouterLink>
            </div>
        </div>
    </div>
</template>