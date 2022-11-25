<script setup>
import { computed } from 'vue';
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const { result, loading, error, refetch } = useQuery(gql`
    query getPosts{
        posts(queryParams:{
            sortBy: [
                {field: TITLE, order: ASC}
            ]
        }){
            id
            title
            content
            views
            authors{
                id
                name
                age
            }
            tags{
                id
                name
            }
        }
    }
`)

const posts = computed(() => result?.value?.posts || [])
</script>

<template>
    <div class="d-flex flex-column gap-2em">
        <div class="d-flex flex-column align-center gap-1em">
            <h1>All posts</h1>
            <div v-if="loading">Loading posts...</div>
        </div>
        <div class="d-flex flex-column align-center gap-2em">
            <v-card v-for="post in posts" :key="post.id" max-width="95%">
                <v-card-title class="text--primary"> {{ post.title }}</v-card-title>
                <v-card-text class="py-2">
                    <div class="d-flex flex-column gap-1em">
                        <div>
                            <span>
                                {{ `${post.authors[0].name} (${post.authors[0].age}y) ` }}
                            </span>
                        </div>
                        <div class="text--primary">{{ post.content }}</div>
                        <div class="d-flex flex-row-reverse gap-1em">
                            <v-chip label variant="outlined" v-for="tag in post.tags" :key="tag.id">
                                {{ tag.name }}
                            </v-chip>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>
