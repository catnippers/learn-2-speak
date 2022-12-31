<template>
  <div class="lts-recognizer-main"
       data-test="lts-recognizer-main">
    <div class="lts-recognizer-word-to-say"
         data-test="lts-recognizer-word-to-say">
      <p class="lts-say"
         data-test="lts-say">
        Please say:
      </p>
      <it-double-popover placement="left"
                         secondPlacement="right"
                         borderless>
        <button class="lts-word"
                data-test="lts-word">
          {{ exercisesStore.$state.wordToSay }}
        </button>
        <template #firstContent>
          <button v-if="webSpeechStore.isRecognitionOff()"
                  class="lts-popover-word"
                  data-test="lts-popover-word"
                  @click="webSpeechStore.playAudioHint()">
            <SpeakerIcon/>
          </button>
          <button v-else
                  class="lts-popover-word"
                  data-test="lts-popover-word"
                  disabled>
            <SpeakerOffIcon/>
          </button>
        </template>
        <template #secondContent>
          <button
              class="lts-popover-word"
              data-test="lts-popover-word"
              @click="exercisesStore.updateWordToSay()">
            <RefreshIcon/>
          </button>
        </template>
      </it-double-popover>
    </div>
    <span class="lts-small-tip"
          data-test="lts-small-tip">
      If you need an <em><strong>audio hint</strong></em>, please press the button with the word above.
      <br/>
      <em><strong>Audio hint</strong></em> doesn't work when the application is listening to you.
      <br/>
      You can use the <em><strong>Refresh</strong></em> button to load a new word.
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
import RefreshIcon from "@/components/icons/RefreshIcon.vue";
import SpeakerIcon from "@/components/icons/SpeakerIcon.vue";
import SpeakerOffIcon from "@/components/icons/SpeakerOffIcon.vue";

export default defineComponent({
  name: 'RecognizerMain',

  components: {
    RefreshIcon,
    SpeakerIcon,
    SpeakerOffIcon
  },

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
