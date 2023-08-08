<script setup lang="ts">
import { type AirlineItem } from '@/airline'
import type { PropType } from 'vue';

defineProps({
    airline: {
        type: Object as PropType<AirlineItem>,
            require: true
    }
})

</script>
<template>
    <div v-if="airline">
        <p>id: {{ airline.id }} AirlineName: {{ airline.AirlineName }} email: {{ airline.email }}</p>
        <p>address: {{ airline.address }}</p>

    </div>
</template>
