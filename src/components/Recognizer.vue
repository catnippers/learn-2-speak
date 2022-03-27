<template>
  <div class="recognizer-wrapper">
    <a href="https://github.com/catnippers/learn-2-speak/"
       target="_blank"
       class="lts-github-icon-corner">
      <svg viewBox="0 0 250 250" class="lts-github-icon">
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
        <path
            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
            fill="currentColor">
        </path>
        <path
            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
            fill="currentColor">
        </path>
      </svg>
    </a>
    <div class="recognizer-header">
      <h1>LEARN TO SPEAK</h1>
      <h2>Simple app for pronunciation learning</h2>
      <it-toggle
          round
          v-model="toggleValue"
          :options="['Alphabet', '1 to 10', '1 to 100', '1 to 1000']"
          style="width: 92%"
          @click.left="setWordToSay(toggleValue)"
          @keyup.left.right="setWordToSay(toggleValue)"
      />
      <span class="lts-small-tip-header">
          Use the <em><strong>slider</strong></em> above to select an exercise.
      </span>
      <h3>Tries: {{ store.$state.tries }} | Points: {{ store.$state.points }}</h3>
    </div>
    <div class="recognizer-main">
      <div class="recognizer-word-to-say">
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
      <div class="recognizer-word-said">
        <p class="lts-say">You said: </p>
        <p class="lts-word">{{ transcriptionDisplay }}</p>
      </div>
    </div>
    <br>
    <div class="recognizer-speak-button">
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
  margin-top: 0;
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

.recognizer-word-to-say {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.recognizer-word-said {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.recognizer-word-said .lts-say {
  margin-top: 12px
}

.recognizer-speak-button {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.recognizer-header {
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

.recognizer-word-to-say .lts-word:hover {
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
import {useStore} from "@/stores/counter";

const letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const alphabetGrammarList = '#JSGF V1.0; grammar alphabet; public <alphabet> = A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y | Z ;';

let recognition: SpeechRecognizer;
let synth: SpeechSynthesis;
let grammars: SpeechGrammarList;

export default defineComponent({
  name: 'Recognizer',

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

    toggleValue: 'Alphabet',
    oldToggleValue: '',
  }),

  setup() {
    const store = useStore();

    return {
      store,
    }
  },

  mounted() {
    this.setupWebSpeechAPI();
    this.setupKeyVToSpeak();
    this.setWordToSay();
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

    setWordToSay() {
      if (this.toggleValue !== this.oldToggleValue) {
        this.stopSynthPlayback();

        if (this.isRecognitionOn) {
          this.stopRecognition()
        }

        this.updateWordToSay();
      }

      this.oldToggleValue = this.toggleValue;
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
          this.store.incrementTries();
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

      if (this.toggleValue === "Alphabet") {
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
        this.store.incrementPoints();
        this.updateWordToSay();
      }

      this.lastTranscription = this.transcription;
    },

    updateWordToSay() {
      switch (this.toggleValue) {
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
