<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const route = useRoute();
const id = route.params.id;

const { result, loading } = useQuery(gql`
    query getAuthor{
        author(id: "${id}"){
            name
            age
            country
            posts {
                id
                title
                views
            }
            tags {
                id
                name
            }
        }
    }
`)

const author = computed(() => result?.value?.author || {})
const posts = computed(() => author.value?.posts || [])
const tags = computed(() => author.value?.tags || [])
</script>

<template>
    <div class="d-flex flex-column gap-2em">
        <div>
            <div v-if="loading"> Loading author infos...</div>
            <div v-else>
                <h1>{{ author?.name }}</h1>
                <div>Age: {{ author?.age }}</div>
                <div>Country: {{ author?.country }}</div>
            </div>
        </div>
        <div v-if="!loading">
            <h2>Posts</h2>
            <div>
                <div v-for="post in posts" :key="post.id">
                    <RouterLink :to='{ path: `/posts/${post.id}` }'>
                        {{ `${post.title} (${post.views} views) ` }}
                    </RouterLink>
                </div>
            </div>
        </div>
        <div v-if="!loading">
            <h2>Tags</h2>
            <div class="d-flex gap-1em">
                <div v-for="tag in tags" :key="tag.id">
                    <RouterLink :to='{ path: `/tags/${tag.id}` }'>
                        <v-chip label variant="outlined">
                            {{ tag.name }}
                        </v-chip>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>