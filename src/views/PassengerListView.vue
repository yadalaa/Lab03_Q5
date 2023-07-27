<script setup lang="ts">
import type { PassengerItem } from '@/passenger';
import { ref, watchEffect, } from 'vue'
import { computed } from 'vue'
import { Ref } from 'vue'
import PassengerService from '@/services/PassengerService';
import type { AxiosResponse } from 'axios';
import PassengerCard from '@/components/PassengerCard.vue';

const passengers: Ref<Array<PassengerItem>> = ref([])
// EventService.getEvent().then((response) => {
//   events.value = response.data
// })
const totalEvent = ref<number>(0)
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})
const hasNextPage = computed(() => {
  //first calculate the total page
  const totalPages = Math.ceil(totalEvent.value / 2)
  return props.page.valueOf() < totalPages
})
// EventService.getEvent(2, props.page).then((response: AxiosResponse<EventItem[]>) => {
//   events.value = response.data
// })

watchEffect(() => {
  PassengerService.getPassenger(2,props.page).then((response: AxiosResponse<PassengerItem[]>) => {
    passengers.value = response.data
    totalEvent.value = response.headers['x-total-count']
    console.log(totalEvent.value)
  })
})
</script>

<template>
    <main class="events">
    <PassengerCard v-for="passenger in passengers" :key="passenger.id" :passenger="passenger"></PassengerCard>
    <div class ="pagination">
      <RouterLink :to="{name: 'passenger-list', query: {page: page - 1} }" rel="prev" v-if="page != 1">Prev Page</RouterLink>
      <RouterLink :to="{name: 'passenger-list', query: {page: page + 1} }" rel="next" v-if="hasNextPage">Next Page</RouterLink>
    </div>
  </main>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination{
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}

</style>