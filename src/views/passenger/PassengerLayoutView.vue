<script setup lang="ts">
import { ref } from 'vue'
import { type PassengerItem } from '@/passenger'
import PassengerService from '@/services/PassengerService'
import { useRouter } from 'vue-router'
import { type AirlineItem } from '@/airline'
const passenger = ref<PassengerItem | null>(null)
const airline = ref<AirlineItem | null>(null)
const props = defineProps({
  id: String
})
const router = useRouter()

PassengerService.getPassengerByID(Number(props.id)).then((response) => {
  passenger.value = response.data
  PassengerService.getAirlineByID(Number(passenger.value?.airlineId)).then((response) => {
  airline.value = response.data
})
})

.catch(error => {
    console.log(error)
    if (error.response && error.response === 404){
        router.push({ name: '404-resource', params: {resource:'passenger'}})
    }else{
        router.push({ name: 'network-error'})
    }
})
</script>
<template>
  <div v-if="passenger">
    <h1>{{ passenger.first_name }}</h1>
    <h1>{{ passenger.airlineId }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'passenger-detail', params: { id } }">Details</router-link>
      > |
      <router-link :to="{ name: 'passenger-airline', params: { id }  }">Airline</router-link>
      > |
    </div>
    <RouterView :passenger="passenger" :airline="airline"></RouterView>
  </div>
</template>
