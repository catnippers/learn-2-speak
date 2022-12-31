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

import {useCounterStore} from "@/app/stores/counter";
import {useRecognizerSliderStore} from "@/app/stores/recognizerSlider";
import {useExercisesStore} from "@/app/stores/exercises";
import {useWebSpeechStore} from "@/app/stores/webSpeech";

import GitHubLink from '@/app/components/icons/GitHubLink.vue';
import ExerciseSlider from "@/app/components/recognizer/ExerciseSlider.vue";
import RecognizerHeader from "@/app/components/recognizer/RecognizerHeader.vue";
import RecognizerMain from "@/app/components/recognizer/RecognizerMain.vue";
import RecognizerSpeakButton from "@/app/components/recognizer/RecognizerSpeakButton.vue";

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
