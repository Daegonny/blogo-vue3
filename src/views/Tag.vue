<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import AuthorsContainer from '../components/AuthorsContainer.vue';
import PostsContainer from '../components/PostsContainer.vue';

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
                views
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
        <AuthorsContainer v-if="!loading" :authors="authors" />
        <PostsContainer v-if="!loading" :posts="posts" />
    </div>
</template>