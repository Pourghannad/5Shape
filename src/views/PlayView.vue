<script setup lang="ts">
import PlayGame from '../components/PlayGame/PlayGame.vue';

</script>

<template>
    <!-- Remount the game per level so navigation (?level=N) always
         rebuilds positions, score and DOM from scratch. -->
    <PlayGame :key="$route.query.level || '1'" />
</template>

