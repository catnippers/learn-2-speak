<template>
  <div class="lts-recognizer-wrapper">
    <GitHubLink/>
    <RecognizerHeader>
      <ExerciseSlider @changedToggleValue="changedToggleValue"/>
    </RecognizerHeader>
    <div class="lts-recognizer-main">
      <div class="lts-recognizer-word-to-say">
        <p class="lts-say">Please say: </p>
        <button class="lts-word"
                @click.left="playAudioHint">
          {{ wordToSay }}
        </button>
        <span class="lts-small-tip">
          If you need an <em><strong>audio hint</strong></em>, please press the button with the word above.
          <br/>
          <em><strong>Audio hint</strong></em> doesn't work when the application is listening to you.
        </span>
      </div>
      <div class="lts-recognizer-word-said">
        <p class="lts-say">You said: </p>
        <p class="lts-word">{{ transcriptionDisplay }}</p>
      </div>
    </div>
    <br>
    <div class="lts-recognizer-speak-button">
      <p v-if="!isRecognitionOn" class="lts-say">
        Press the button below and speak out loud to start
        <br>
        <span class="lts-small-tip">(Pressing the <em><strong>V key</strong></em> also works)</span>
      </p>
      <p v-else class="lts-say">
        Make sure that you're speaking loud and clear</p>
      <br>
      <button v-if="!isRecognitionOn" class="lts-button" @click="startRecognition">THE BUTTON</button>
      <button v-else class="lts-button-steady" @click="stopRecognition">LISTENING</button>
    </div>
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
  margin-top: 6px;
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

.lts-recognizer-word-said .lts-say {
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

.lts-word {
  font-weight: 700;
  font-size: 24px;
  padding: 0.35em 1.2em;
  margin-top: 12px;
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
import GitHubLink from '@/components/GitHubLink.vue';
import ExerciseSlider from "@/components/ExerciseSlider.vue";
import RecognizerHeader from "@/components/RecognizerHeader.vue";

const letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const alphabetGrammarList = '#JSGF V1.0; grammar alphabet; public <alphabet> = A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y | Z ;';

let recognition: SpeechRecognizer;
let synth: SpeechSynthesis;
let grammars: SpeechGrammarList;

export default defineComponent({
  name: 'Recognizer',

  components: {
    RecognizerHeader,
    GitHubLink,
    ExerciseSlider
  },

  props: {
    lang: {type: String, default: 'en-US'},
  },

  data: () => ({
    wordToSay: '',
    lettersList: letters,
    isRecognitionOn: false,

    transcriptionDisplay: 'Nothing yet...',
    transcription: 'Nothing yet...',
    lastTranscription: 'Nothing yet...',
  }),

  setup() {
    const counterStore = useCounterStore();
    const recognizerSliderStore = useRecognizerSliderStore();

    return {
      counterStore,
      recognizerSliderStore
    }
  },

  mounted() {
    this.setupWebSpeechAPI();
    this.setupKeyVToSpeak();
    this.initWordToSay();
  },

  methods: {
    setupWebSpeechAPI() {
      window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;
      window.SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList || window.mozSpeechGrammarList || window.msSpeechGrammarList;

      grammars = new window.SpeechGrammarList;
      grammars.addFromString(alphabetGrammarList, 1);
      recognition = new window.SpeechRecognition;
      synth = window.speechSynthesis;

      recognition.grammars = grammars;
      recognition.lang = this.lang;
      recognition.interimResults = false;
      recognition.continuous = false;
      recognition.maxAlternatives = 1;
    },

    setupKeyVToSpeak() {
      document.addEventListener('keyup', event => {
        if (event.code === 'KeyV') {
          this.stopSynthPlayback();

          if (this.isRecognitionOn) {
            this.stopRecognition();
          } else {
            this.startRecognition();
          }
        }
      });
    },

    initWordToSay() {
      this.updateWordToSay();
    },

    changedToggleValue() {
      this.setWordToSay();
    },

    setWordToSay() {
      if (!this.recognizerSliderStore.isNewAndOldToggleValuesEqual()) {
        if (synth.speaking) {
          this.stopSynthPlayback();
        }

        if (this.isRecognitionOn) {
          this.stopRecognition()
        }

        this.updateWordToSay();
      }

      this.recognizerSliderStore.setOldToggleValue();
    },

    getRandomIntFromInterval(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1) + min).toString()
    },

    getRandomTriplet() {
      let triplet: any[] = [];
      for (let i = 0; i < 3; i++) {
        triplet.push(this.lettersList[Math.floor(Math.random() * this.lettersList.length)]);
      }
      return triplet.toString().replaceAll(",", ", ");
    },

    playAudioHint() {
      if (!synth.speaking && !this.isRecognitionOn) {
        const voicesList = synth.getVoices();
        const utterThis = new SpeechSynthesisUtterance(this.wordToSay);

        utterThis.rate = 0.8;
        utterThis.voice = voicesList[33];
        synth.speak(utterThis);
      }
    },

    startRecognition() {
      this.stopSynthPlayback();

      this.isRecognitionOn = true;
      recognition.start();

      recognition.addEventListener('result', (event: any) => {
        this.transcription = event.results[0][0].transcript.toString();
        if (this.transcription !== this.lastTranscription) {
          this.verifySaidWord();
          this.counterStore.incrementTries();
        }
      })

      recognition.addEventListener('audioend', () => {
        this.stopRecognition();
      })
    },

    stopRecognition() {
      recognition.stop();
      this.isRecognitionOn = false;
    },

    stopSynthPlayback() {
      if (synth.speaking) {
        synth.cancel();
      }
    },

    verifySaidWord() {
      let result = this.transcription;

      if (this.recognizerSliderStore.toggleValue === "Alphabet") {
        // Web Speech API should (in the most cases) return three letters as a triple-character string
        // (if User speaks loud and clear)
        if (result.length === 3) {
          result = result.split('').join(', ');
          this.transcriptionDisplay = result.toUpperCase();
        }

        // Web Speech API sometimes splits three letters with empty spaces between them
        // thus we have to take care of the empty spaces somehow
        if (result.length === 5) {
          result = result.trim().replaceAll(' ', '').split('').join(', ');
          this.transcriptionDisplay = result.toUpperCase();
        }
      } else {
        this.transcriptionDisplay = this.transcription;
      }

      if (this.wordToSay === result.toUpperCase()) {
        this.counterStore.incrementPoints();
        this.updateWordToSay();
      }

      this.lastTranscription = this.transcription;
    },

    updateWordToSay() {
      switch (this.recognizerSliderStore.toggleValue) {
        case "Alphabet": {
          this.wordToSay = this.getRandomTriplet();
          break;
        }
        case "1 to 10": {
          this.wordToSay = this.getRandomIntFromInterval(1, 10);
          break;
        }
        case "1 to 100": {
          this.wordToSay = this.getRandomIntFromInterval(1, 100);
          break;
        }
        case "1 to 1000": {
          this.wordToSay = this.getRandomIntFromInterval(1, 1000);
          break;
        }
      }
    },
  }

})
</script>
