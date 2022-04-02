<template>
  <div class="lts-recognizer-header">
    <h1>LEARN TO SPEAK</h1>
    <h2>Simple app for pronunciation learning</h2>
    <slot></slot>
    <span class="lts-small-tip-header">
          Use the <em><strong>slider</strong></em> above to select an exercise.
      </span>
    <h3>Tries: {{ counterStore.$state.tries }} | Points: {{ counterStore.$state.points }}</h3>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useCounterStore} from "@/stores/counter";

export default defineComponent({
  name: 'RecognizerHeader',

  setup() {
    const counterStore = useCounterStore();

    return {
      counterStore
    }
  },
})
</script>
