<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const route = useRoute();
const id = route.params.id;

const { result, loading } = useQuery(gql`
    query getPost{
        post(id: "${id}"){
            title
            content
            views
            authors {
                id
                name
            }
            tags {
                id
                name
            }
        }
    }
`)

const post = computed(() => result?.value?.post || {})
const authors = computed(() => post.value?.authors || [])
const tags = computed(() => post.value?.tags || [])
</script>

<template>
    <div class="d-flex flex-column gap-2em">
        <div>
            <div v-if="loading"> Loading post infos...</div>
            <div v-else>
                <h1>{{ post?.title }} </h1>

            </div>
        </div>
        <div v-if="!loading">
            <p>{{ post?.content }}</p>
            <div class="d-flex justify-end">
                <div>
                    Views: {{ post?.views }}
                </div>
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