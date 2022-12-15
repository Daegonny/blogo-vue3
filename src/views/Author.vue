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
                <h2>Age: {{ author?.age }}</h2>
                <h2>Country: {{ author?.country }}</h2>
            </div>
        </div>
        <div>
            <h2>Posts</h2>
            <div>
                <div v-for="post in posts" :key="post.id">
                    <RouterLink :to='{ path: `/post/${post.id}` }'>
                        {{ `${post.title} (${post.views} views) ` }}
                    </RouterLink>
                </div>
            </div>
        </div>
        <div>
            <h2>Tags</h2>
            <div>
                <div v-for="tag in tags" :key="tag.id">
                    <RouterLink :to='{ path: `/tag/${tag.id}` }'>
                        {{ tag.name }}
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>