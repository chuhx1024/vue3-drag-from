<template>
    <div class="app">
        <Editor v-model="state">33 </Editor>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import data from './data.json'
import Editor from '@/packages/editor'
const state = ref(data)
</script>

<style lang="scss" scoped>
.app {
    position: fixed;
    top: 20px;
    bottom: 20px;
    left: 20px;
    right: 20px;
}
</style>
