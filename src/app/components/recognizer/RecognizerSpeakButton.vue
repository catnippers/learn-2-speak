<template>
  <div class="lts-recognizer-speak-button"
       data-test="lts-recognizer-speak-button">
    <p class="lts-say"
       data-test="lts-say"
       v-if="webSpeechStore.isRecognitionOff()">
      Press the button below and speak out loud to start
      <br/>
      <span class="lts-small-tip"
            data-test="lts-small-tip">
          (Pressing the <em><strong>V key</strong></em> also works)
        </span>
    </p>
    <p v-else
       class="lts-say"
       data-test="lts-say">
      Make sure that you're speaking loud and clear
    </p>
    <br/>
    <button class="lts-button"
            data-test="lts-button"
            v-if="webSpeechStore.isRecognitionOff()"
            @click="webSpeechStore.startRecognition()">
      THE BUTTON
    </button>
    <button class="lts-button-steady"
            data-test="lts-button-steady"
            v-else
            @click="webSpeechStore.stopRecognition()">
      LISTENING
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useWebSpeechStore} from "@/app/stores/webSpeech";
import {useExercisesStore} from "@/app/stores/exercises";

export default defineComponent({
  name: 'RecognizerSpeakButton',

  setup() {
    const webSpeechStore = useWebSpeechStore();
    const exercisesStore = useExercisesStore();

    return {
      webSpeechStore,
      exercisesStore
    }
  },
})
</script>
