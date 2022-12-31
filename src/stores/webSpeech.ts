import {defineStore} from 'pinia'
import {useExercisesStore} from "@/stores/exercises";
import {useCounterStore} from "@/stores/counter";
import {useRecognizerSliderStore} from "@/stores/recognizerSlider";
import {useWordsStore} from "@/stores/words";
import {getNumberProps, NumberToWord} from "@/data/numberToWord";

let recognition: SpeechRecognizer;
let synth: SpeechSynthesis;
let grammars: SpeechGrammarList;

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
            const wordsStore = useWordsStore();
            wordsStore.updateLettersList();

            window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;
            window.SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList || window.mozSpeechGrammarList || window.msSpeechGrammarList;

            grammars = new window.SpeechGrammarList;
            grammars.addFromString(wordsStore.grammarList, 1);
            recognition = new window.SpeechRecognition;
            synth = window.speechSynthesis;

            recognition.grammars = grammars;
            recognition.lang = this.lang;
            recognition.interimResults = false;
            recognition.continuous = false;
            recognition.maxAlternatives = 5;
        },

        getCurrentLanguage() {
            return this.lang;
        },

        // WEB SPEECH RECOGNITION METHODS
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
            const recognizerSliderStore = useRecognizerSliderStore();

            this.stopSynthPlayback();
            this.runRecognitionIfNotYetRunning();

            if (recognizerSliderStore.toggleValue === "Alphabet") {
                this.performRecognitionForAlphabet();
            } else {
                this.performRecognitionForNumbers();
            }

            this.stopRecognitionOnAudioEndEvent();
        },

        performRecognitionForAlphabet() {
            const exercisesStore = useExercisesStore();
            const counterStore = useCounterStore();

            recognition.addEventListener('result', (event: any) => {
                this.setTranscription(event.results[0][0].transcript.toString());
            });

            if (this.isNotNewAndOldTranscriptionEqual()) {
                exercisesStore.verifySaidWord();
                counterStore.incrementTries();
            }
        },

        performRecognitionForNumbers() {
            const exercisesStore = useExercisesStore();
            const counterStore = useCounterStore();

            recognition.addEventListener('result', (event: any) => {
                const baselineAlternative = event.results[0][0].transcript.toLowerCase();
                const alternatives: SpeechRecognitionAlternative[] = Object.values(event.results[0]);

                if (baselineAlternative.length === 2) {
                    if (alternatives.length > 1) {
                        let indexCounter: number = 0;
                        let validAlternativeFound: boolean = false;

                        for (const alternative of alternatives) {
                            const alternativeTranscript = alternative.transcript;
                            const baselineAsInt = parseInt(baselineAlternative);

                            if (indexCounter === 0) {
                                indexCounter++;
                                continue;
                            }

                            validAlternativeFound = (() => {
                                switch (true) {
                                    case baselineAsInt === 10:
                                        return this.validatePronunciation(alternativeTranscript, NumberToWord.ten);
                                    case baselineAsInt === 11:
                                        return this.validatePronunciation(alternativeTranscript, NumberToWord.eleven);
                                    case baselineAsInt === 12:
                                        return this.validatePronunciation(alternativeTranscript, NumberToWord.twelve);
                                    case baselineAsInt < 20:
                                        return this.validatePronunciation(alternativeTranscript, NumberToWord.teen);
                                    case baselineAsInt < 30:
                                        return this.validatePronunciation(alternativeTranscript, NumberToWord.twenty);
                                    case baselineAsInt < 40:
                                        return this.validatePronunciation(alternativeTranscript, NumberToWord.thirty);
                                    case baselineAsInt < 50:
                                        return this.validatePronunciation(alternativeTranscript, NumberToWord.forty);
                                    case baselineAsInt < 60:
                                        return this.validatePronunciation(alternativeTranscript, NumberToWord.fifty);
                                    case baselineAsInt < 70:
                                        return this.validatePronunciation(alternativeTranscript, NumberToWord.sixty);
                                    case baselineAsInt < 80:
                                        return this.validatePronunciation(alternativeTranscript, NumberToWord.seventy);
                                    case baselineAsInt < 90:
                                        return this.validatePronunciation(alternativeTranscript, NumberToWord.eighty);
                                    case baselineAsInt < 100:
                                        return this.validatePronunciation(alternativeTranscript, NumberToWord.ninety);
                                    default:
                                        return true;
                                }
                            })();

                            if (validAlternativeFound) {
                                this.setTranscription(baselineAlternative.toString());
                                break;
                            }
                        }
                    } else {
                        // KNOWN ISSUE:
                        // this is prepared for '17' & '19' which happen to have no alternatives
                        // (e.g., both nineteen and one nine have only one result to select from)
                        this.setTranscription(baselineAlternative);
                    }
                }

                if (baselineAlternative.length === 3) {
                    if (alternatives.length > 1) {
                        let indexCounter: number = 0;
                        let validAlternativeFound: boolean = false;

                        for (const alternative of alternatives) {
                            const alternativeTranscript = alternative.transcript;
                            const baselineAsInt = parseInt(baselineAlternative);

                            if (indexCounter === 0) {
                                indexCounter++;
                                continue;
                            }
                            // for 1-9xxx numbers (based on the baselineAlternative)
                            validAlternativeFound = (() => {
                                switch (true) {
                                    case baselineAsInt < 200:
                                        return this.validatePronunciation(alternativeTranscript, NumberToWord.hundred);
                                    default:
                                        return true;
                                }
                            })();

                            if (validAlternativeFound) {
                                this.setTranscription(baselineAlternative.toString());
                                break;
                            }
                        }
                    } else {
                        // KNOWN ISSUE:
                        // this is prepared for '17' & '19' which happen to have no alternatives
                        // (e.g., both nineteen and one nine have only one result to select from)
                        this.setTranscription(baselineAlternative);
                    }
                }

                if (baselineAlternative.length !== 2 && baselineAlternative.length !== 3) {
                    this.setTranscription(baselineAlternative);
                }

                if (this.isNotNewAndOldTranscriptionEqual()) {
                    exercisesStore.verifySaidWord();
                    counterStore.incrementTries();
                }
            })
        },

        validatePronunciation(alternativeTranscript: string, numberToWord: NumberToWord): boolean {
            const numberPronunciation = getNumberProps(numberToWord).pronunciation;
            const numberInvalidPronunciation = getNumberProps(numberToWord).invalidPronunciation;

            if (this.checkIfStringContainsValue(alternativeTranscript, numberPronunciation)) {
                return true;
            } else if (this.checkIfStringContainsValue(alternativeTranscript, `${getNumberProps(numberToWord).numberValue}:00`)) {
                // this check is for lack of alternatives for twelve (it has only: 12 & 12:00)
                return true;
            } else {
                this.setTranscription(`Please do not use the form of ${numberInvalidPronunciation}.`);
                return false;
            }
        },

        checkIfStringContainsValue(stringToVerify: string, lookUpValue: string): boolean {
            return stringToVerify.toLowerCase().indexOf(lookUpValue) !== -1;
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
                const utterThis = new SpeechSynthesisUtterance(exercisesStore.wordToSay);

                utterThis.rate = 0.8;
                utterThis.lang = this.lang;
                synth.speak(utterThis);
            }
        },

        isAudioOn() {
            return this.isSynthOn() && this.isRecognitionOn();
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
