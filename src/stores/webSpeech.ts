import {defineStore} from 'pinia'
import {useExercisesStore} from "@/stores/exercises";
import {useCounterStore} from "@/stores/counter";

let recognition: SpeechRecognizer;
let synth: SpeechSynthesis;
let grammars: SpeechGrammarList;

const englishAlphabetGrammarList = '#JSGF V1.0; grammar alphabet; public <alphabet> = A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y | Z ;';

export type RootState = {
    lang: string;
    recognitionOn: boolean;
    transcriptionDisplay: string;
    transcription: string;
    lastTranscription: string;
}

export const useWebSpeechStore = defineStore({
    id: 'webSpeech',

    state: () => ({
        lang: 'en-US',
        recognitionOn: false,
        transcriptionDisplay: 'Nothing yet...',
        transcription: 'Nothing yet...',
        lastTranscription: 'Nothing yet...',
    } as RootState),

    actions: {
        setupWebSpeech() {
            window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;
            window.SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList || window.mozSpeechGrammarList || window.msSpeechGrammarList;

            grammars = new window.SpeechGrammarList;
            grammars.addFromString(englishAlphabetGrammarList, 1);
            recognition = new window.SpeechRecognition;
            synth = window.speechSynthesis;

            recognition.grammars = grammars;
            recognition.lang = this.lang;
            recognition.interimResults = false;
            recognition.continuous = false;
            recognition.maxAlternatives = 1;
        },

        // WEB SPEECH RECOGNITION METHODS
        getRecognition() {
            return recognition;
        },

        isRecognitionOn() {
            return this.recognitionOn;
        },

        isRecognitionOff() {
            return !this.recognitionOn;
        },

        runRecognitionIfNotYetRunning() {
            if (this.isRecognitionOff()) {
                recognition.start();
                this.recognitionOn = true;
            }
        },

        startRecognition() {
            const exercisesStore = useExercisesStore();
            const counterStore = useCounterStore();

            this.stopSynthPlayback();
            this.runRecognitionIfNotYetRunning();

            recognition.addEventListener('result', (event: any) => {
                this.setTranscription(event.results[0][0].transcript.toString());
                if (this.isNotNewAndOldTranscriptionEqual()) {
                    exercisesStore.verifySaidWord();
                    counterStore.incrementTries();
                }
            })
            this.stopRecognitionOnAudioEndEvent();
        },

        stopRecognition() {
            if (this.isRecognitionOn()) {
                recognition.stop();
                this.recognitionOn = false;
            }
        },

        stopRecognitionOnAudioEndEvent() {
            recognition.addEventListener('audioend', () => {
                this.stopRecognition();
            })
        },

        // WEB SPEECH SYNTH METHODS
        getSynth() {
            return synth;
        },

        isSynthOn() {
            return synth.speaking;
        },

        isSynthOff() {
            return !synth.speaking;
        },

        stopSynthPlayback() {
            if (this.isSynthOn()) {
                synth.cancel();
            }
        },

        playAudioHint() {
            const exercisesStore = useExercisesStore();

            if (this.isAudioOff()) {
                const voicesList = synth.getVoices();
                const utterThis = new SpeechSynthesisUtterance(exercisesStore.wordToSay);

                utterThis.rate = 0.8;
                utterThis.voice = voicesList[33];
                synth.speak(utterThis);
            }
        },

        isAudioOff() {
            return this.isSynthOff() && this.isRecognitionOff();
        },

        // TRANSCRIPTION METHODS
        setTranscription(newValue: string) {
            this.transcription = newValue;
        },

        setTranscriptionDisplay(newValue: string) {
            this.transcriptionDisplay = newValue;
        },

        setNewTranscriptionAsTranscriptionDisplay() {
            this.setTranscriptionDisplay(this.transcription);
        },

        updateLastTranscription() {
            this.lastTranscription = this.transcription;
        },

        isNotNewAndOldTranscriptionEqual() {
            return this.transcription !== this.lastTranscription;
        },
    },
})
