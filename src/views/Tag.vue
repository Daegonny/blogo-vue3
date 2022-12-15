<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const route = useRoute();
const id = route.params.id;

const { result, loading } = useQuery(gql`
    query getTag{
        tag(id: "${id}"){
            name
            authors {
                id
                name
            }
            posts {
                id
                title
            }
        }
    }
`)

const tag = computed(() => result?.value?.tag || {})
const authors = computed(() => tag.value?.authors || [])
const posts = computed(() => tag.value?.posts || [])
</script>

<template>
    <div class="d-flex flex-column gap-2em">
        <div>
            <div v-if="loading"> Loading tag infos...</div>
            <div v-else>
                <h1>{{ tag?.name }}</h1>
            </div>
        </div>
        <div v-if="!loading">
            <h2>Authors</h2>
            <div>
                <div v-for="author in authors" :key="author.id">
                    <RouterLink :to='{ path: `/authors/${author.id}` }'>
                        {{ author.name }}
                    </RouterLink>
                </div>
            </div>
        </div>
        <div v-if="!loading">
            <h2>Posts</h2>
            <div>
                <div v-for="post in posts" :key="post.id">
                    <RouterLink :to='{ path: `/posts/${post.id}` }'>
                        {{ post.title }}
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>