<template>
  <h3>Tries: {{ counterStore.$state.tries }} | Points: {{ counterStore.$state.points }}</h3>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useCounterStore} from "@/stores/counter";

export default defineComponent({
  name: 'RecognizerCounter',

  setup() {
    const counterStore = useCounterStore();

    return {
      counterStore
    }
  },
})
</script>
