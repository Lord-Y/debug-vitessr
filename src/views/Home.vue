<template>
    <div>{{ runtimeConfig.TEST_VARIABLE }}</div>
</template>

<script setup lang="ts">
import { useRuntimeEnv } from '../plugins/runtimeConfig';

const runtimeConfig = useRuntimeEnv()
// console.log('runtimeConfig', runtimeConfig)
</script>
