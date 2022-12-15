<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import AuthorsContainer from '../components/AuthorsContainer.vue';
import TagsContainer from '../components/TagsContainer.vue';

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
        <AuthorsContainer v-if="!loading" :authors="authors" />
        <TagsContainer v-if="!loading" :tags="tags" />
    </div>
</template>