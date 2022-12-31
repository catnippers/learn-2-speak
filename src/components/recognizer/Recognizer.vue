<template>
  <div class="lts-recognizer-wrapper"
       data-test="lts-recognizer-wrapper">
    <GitHubLink/>
    <RecognizerHeader>
      <ExerciseSlider/>
    </RecognizerHeader>
    <RecognizerMain/>
    <RecognizerSpeakButton/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

import {useCounterStore} from "@/stores/counter";
import {useRecognizerSliderStore} from "@/stores/recognizerSlider";
import {useExercisesStore} from "@/stores/exercises";
import {useWebSpeechStore} from "@/stores/webSpeech";

import GitHubLink from '@/components/icons/GitHubLink.vue';
import ExerciseSlider from "@/components/recognizer/ExerciseSlider.vue";
import RecognizerHeader from "@/components/recognizer/RecognizerHeader.vue";
import RecognizerMain from "@/components/recognizer/RecognizerMain.vue";
import RecognizerSpeakButton from "@/components/recognizer/RecognizerSpeakButton.vue";

export default defineComponent({
  name: 'Recognizer',

  components: {
    RecognizerSpeakButton,
    RecognizerMain,
    RecognizerHeader,
    GitHubLink,
    ExerciseSlider
  },

  setup() {
    const counterStore = useCounterStore();
    const recognizerSliderStore = useRecognizerSliderStore();
    const webSpeechStore = useWebSpeechStore();
    const exercisesStore = useExercisesStore();

    return {
      counterStore,
      recognizerSliderStore,
      webSpeechStore,
      exercisesStore
    }
  },

  mounted() {
    this.webSpeechStore.setupWebSpeech();
    this.exercisesStore.updateWordToSay();
    this.setupKeyVToSpeak();
  },

  methods: {
    setupKeyVToSpeak() {
      document.addEventListener('keyup', event => {
        if (event.code === 'KeyV') {
          this.webSpeechStore.stopSynthPlayback();

          if (this.webSpeechStore.isRecognitionOn()) {
            this.webSpeechStore.stopRecognition();
          } else {
            this.webSpeechStore.startRecognition();
          }
        }
      });
    },
  }

})
</script>
