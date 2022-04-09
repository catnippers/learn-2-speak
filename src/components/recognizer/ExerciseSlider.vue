<template>
  <it-toggle
      class="lts-exercise-slider"
      data-test="lts-exercise-slider"
      style="width: 420px"
      round
      v-model="toggleValue"
      :options="this.recognizerSliderStore.$state.sliderOptions"
      @click.left="changedToggleValue()"
      @keyup.left.right="changedToggleValue()"
  />
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useRecognizerSliderStore} from "@/stores/recognizerSlider";
import {useExercisesStore} from "@/stores/exercises";

export default defineComponent({
  name: 'ExerciseSlider',

  data: () => ({
    toggleValue: 'Alphabet',
  }),

  setup() {
    const recognizerSliderStore = useRecognizerSliderStore();
    const exercisesStore = useExercisesStore();

    return {
      recognizerSliderStore,
      exercisesStore,
    }
  },

  methods: {
    changedToggleValue() {
      this.recognizerSliderStore.setToggleValue(this.toggleValue);
      this.exercisesStore.setWordToSay();
    }
  }
})
</script>
