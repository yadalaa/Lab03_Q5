<script setup lang="ts">
import { ref } from 'vue'
import { type PassengerItem } from '@/passenger'
import type { PropType } from 'vue';

defineProps({
    passenger: {
        type: Object as PropType<PassengerItem>,
            require: true
    }
})

</script>
<template>
    <div v-if="passenger">
        <p>first name: {{ passenger.first_name }} last name: {{ passenger.last_name }} email: {{ passenger.email }}</p>
        <p>gender: {{ passenger.gender  }} ip: {{ passenger.ip_address }} Source: {{  passenger.Source }}</p>
        <p>Destination: {{ passenger.Destination  }} travelDate: {{ passenger.travelDate }} airlineId: {{  passenger.airlineId }}</p>

    </div>
</template>
