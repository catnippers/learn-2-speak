<template>
  <div class="lts-recognizer-header"
       data-test="lts-recognizer-header">
    <h1>LEARN TO SPEAK</h1>
    <h2>Simple app for pronunciation learning</h2>
    <slot></slot>
    <span class="lts-small-tip-header"
          data-test="lts-small-tip-header">
          Use the <em><strong>slider</strong></em> above to select an exercise.
      </span>
    <RecognizerCounter/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useCounterStore} from "@/app/stores/counter";
import RecognizerCounter from "@/app/components/recognizer/RecognizerCounter.vue";

export default defineComponent({
  name: 'RecognizerHeader',
  components: {RecognizerCounter},
  setup() {
    const counterStore = useCounterStore();

    return {
      counterStore
    }
  },
})
</script>
