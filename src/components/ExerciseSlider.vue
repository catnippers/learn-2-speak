<template>
  <it-toggle
      round
      v-model="toggleValue"
      :options="this.recognizerSliderStore.$state.sliderOptions"
      style="width: 420px"
      @click.left="changedToggleValue()"
      @keyup.left.right="changedToggleValue()"
  />
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useRecognizerSliderStore} from "@/stores/recognizerSlider";

export default defineComponent({
  name: 'ExerciseSlider',

  data: () => ({
    toggleValue: 'Alphabet',
    oldToggleValue: '',
  }),

  setup() {
    const recognizerSliderStore = useRecognizerSliderStore();

    return {
      recognizerSliderStore
    }
  },

  emits: ["changedToggleValue"],

  methods: {
    changedToggleValue() {
      this.recognizerSliderStore.setToggleValue(this.toggleValue);
      this.$emit("changedToggleValue");
    }
  }
})
</script>
