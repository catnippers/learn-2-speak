<template>
  <div class="lts-recognizer-main"
       data-test="lts-recognizer-main">
    <div class="lts-recognizer-word-to-say"
         data-test="lts-recognizer-word-to-say">
      <p class="lts-say"
         data-test="lts-say">
        Please say:
      </p>
      <it-double-popover placement="left" secondPlacement="right" borderless>
        <button class="lts-word"
                data-test="lts-word">
          {{ exercisesStore.$state.wordToSay }}
        </button>
        <template #firstContent>
          <button
              class="lts-popover-word"
              data-test="lts-popover-word"
              @click="webSpeechStore.playAudioHint()">
            RF
          </button>
        </template>
        <template #secondContent>
          <button
              class="lts-popover-word"
              data-test="lts-popover-word">
            RF
          </button>
        </template>
      </it-double-popover>
    </div>
    <span class="lts-small-tip"
          data-test="lts-small-tip">
          If you need an <em><strong>audio hint</strong></em>, please press the button with the word above.
          <br/>
          <em><strong>Audio hint</strong></em> doesn't work when the application is listening to you.
        </span>
  </div>
  <div class="lts-recognizer-word-said"
       data-test="lts-recognizer-word-said">
    <p class="lts-say"
       data-test="lts-say">
      You said:
    </p>
    <p class="lts-word"
       data-test="lts-word">
      {{ webSpeechStore.$state.transcriptionDisplay }}
    </p>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useWebSpeechStore} from "@/stores/webSpeech";
import {useExercisesStore} from "@/stores/exercises";

export default defineComponent({
  name: 'RecognizerMain',

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
