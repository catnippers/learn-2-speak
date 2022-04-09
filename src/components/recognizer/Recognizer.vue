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

<style>
@import url("https://use.typekit.net/cpg2hdr.css");

body {
  display: flex;
  font-family: poppins, sans-serif;
  font-style: normal;
  color: #ffaa93;
  background-color: #2c3e50;
  justify-content: center;
}

h1 {
  font-weight: 900;
  font-size: 42px;
  margin-top: -2px;
}

h2 {
  margin-top: -36px;
  font-weight: 400;
  font-size: 16px;
}

h3 {
  margin-top: 0px;
  margin-bottom: 6px;
  font-size: 24px;
}

.it-double-tooltip {
  margin-top: 12px;
}

.it-toggle {
  border: solid 3px #ffaa93;
  background-color: #2c3e50;
}

.it-toggle-value {
  color: #543730;
}

.it-toggle-value span {
  font-weight: 900;
  color: #543730;
}

.it-toggle-value:not(.it-toggle-value--selected) span {
  color: #ffaa93;
  transition: 1s;
}

.it-toggle:focus {
  box-shadow: 0 0 0 1px rgba(113, 204, 186, 0.34), 0 0 0 4px rgba(147, 255, 242, 0.22);
  font-weight: 900;
}

.it-toggle-slider {
  background-color: #ffaa93;
}

.it-toggle-slider:focus {
  background-color: #ffaa93;
}

.lts-recognizer-word-to-say {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lts-recognizer-word-said {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lts-recognizer-word-said .lts-word {
  margin-top: 12px;
}

.lts-say {
  margin-top: 12px
}

.lts-recognizer-speak-button {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lts-recognizer-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lts-say {
  font-weight: 700;
  font-size: 18px;
  text-align: center;
}

.lts-popover-word {
  font-weight: 700;
  font-size: 24px;
  padding: 0.35em 1.2em;
  border: 0.1em solid #ffaa93;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  color: #ffaa93;
  background-color: #2c3e50;
  text-align: center;
  transition: all 0.2s;
}

.lts-refresh-icon {
  margin-top: 2px;
  margin-bottom: -4px;
}

.lts-speaker-icon {
  margin-top: 2px;
  margin-bottom: -4px;
}

.lts-popover-word:focus {
  box-shadow: 0 0 0 1px rgba(113, 204, 186, 0.34), 0 0 0 4px rgba(147, 255, 242, 0.22);
  outline: 0;
}

.lts-recognizer-word-to-say .lts-popover-word:hover {
  color: #2c3e50;
  background-color: #ffaa93;
  cursor: pointer;
}

.lts-recognizer-word-to-say .lts-say {
  margin: 0;
}

.lts-word {
  font-weight: 700;
  font-size: 24px;
  padding: 0.35em 1.2em;
  border: 0.1em solid #ffaa93;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  color: #ffaa93;
  background-color: #2c3e50;
  text-align: center;
  transition: all 0.2s;
}

.lts-word:focus {
  box-shadow: 0 0 0 1px rgba(113, 204, 186, 0.34), 0 0 0 4px rgba(147, 255, 242, 0.22);
  outline: 0;
}

.lts-recognizer-word-to-say .lts-word:hover {
  color: #2c3e50;
  background-color: #ffaa93;
  cursor: pointer;
}

.lts-small-tip {
  display: block;
  font-weight: 400;
  font-size: 12px;
  padding-top: 12px;
  color: #ffaa93;
  text-align: center;
}

.lts-small-tip-header {
  font-weight: 400;
  font-size: 12px;
  padding-bottom: 12px;
  margin-top: 12px;
  color: #ffaa93;
  text-align: center;
}

.lts-button {
  font-family: poppins, sans-serif;
  padding: 0.35em 1.2em;
  border: 0.1em solid #ffaa93;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  font-weight: 700;
  font-size: 24px;
  color: #ffaa93;
  background-color: #2c3e50;
  text-align: center;
  transition: all 0.2s;
  position: relative;
  animation: bouncy 5s infinite linear;
}

.lts-button:hover {
  color: #2c3e50;
  background-color: #ffaa93;
  cursor: pointer;
}

.lts-button:focus {
  box-shadow: 0 0 0 1px rgba(113, 204, 186, 0.34), 0 0 0 4px rgba(147, 255, 242, 0.22);
  outline: 0;
}

.lts-button-steady {
  font-family: poppins, sans-serif;
  padding: 0.35em 1.2em;
  border: 0.1em solid #ffaa93;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  font-weight: 700;
  font-size: 24px;
  color: #ffaa93;
  background-color: #2c3e50;
  text-align: center;
  transition: all 0.2s;
}

.lts-button-steady:hover {
  color: #2c3e50;
  background-color: #ffaa93;
  cursor: pointer;
}

.lts-button-steady:focus {
  box-shadow: 0 0 0 1px rgba(113, 204, 186, 0.34), 0 0 0 4px rgba(147, 255, 242, 0.22);
  outline: 0;
}

.lts-github-icon {
  fill: #ffaa93;
  color: #2c3e50;
  position: absolute;
  top: 0;
  border: 0;
  right: 0;
  width: 60px
}

@media all and (max-width: 30em) {
  .lts-button {
    margin: 0.4em auto;
  }

  .lts-button-steady {
    margin: 0.4em auto;
  }
}

.lts-github-icon {
  width: 60px;
  transition: width 1s;
}

.lts-github-icon:hover {
  width: 100px;
  transition: width 1s;
}

@keyframes bouncy {
  0% {
    top: 0
  }
  40% {
    top: 0
  }
  43% {
    top: -0.9em
  }
  46% {
    top: 0
  }
  48% {
    top: -0.4em
  }
  50% {
    top: 0
  }
  100% {
    top: 0
  }
}
</style>

<script lang="ts">
import {defineComponent} from "vue";

import {useCounterStore} from "@/stores/counter";
import {useRecognizerSliderStore} from "@/stores/recognizerSlider";
import {useExercisesStore} from "@/stores/exercises";
import {useWebSpeechStore} from "@/stores/webSpeech";

import GitHubLink from '@/components/GitHubLink.vue';
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
