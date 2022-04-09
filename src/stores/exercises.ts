import {defineStore} from 'pinia'
import {useRecognizerSliderStore} from "@/stores/recognizerSlider";
import {useWebSpeechStore} from "@/stores/webSpeech";
import {useCounterStore} from "@/stores/counter";

export type RootState = {
    wordToSay: string;
    lettersList: string[];
}

const letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export const useExercisesStore = defineStore({
    id: 'exercises',

    state: () => ({
        wordToSay: '',
        lettersList: letters,
    } as RootState),

    actions: {
        setWordToSay() {
            const recognizerSliderStore = useRecognizerSliderStore();
            const webSpeechStore = useWebSpeechStore();

            if (recognizerSliderStore.isNotNewAndOldToggleValuesEqual()) {
                webSpeechStore.stopSynthPlayback();
                webSpeechStore.stopRecognition();
                this.updateWordToSay();
            }
            recognizerSliderStore.setOldToggleValue();
        },

        verifySaidWord() {
            const webSpeechStore = useWebSpeechStore();
            const recognizerSliderStore = useRecognizerSliderStore();
            const counterStore = useCounterStore();

            let result = webSpeechStore.transcription;

            if (recognizerSliderStore.toggleValue === "Alphabet") {
                // Web Speech API should (in the most cases) return three letters as a triple-character string
                // (if User speaks loud and clear)
                if (result.length === 3) {
                    result = result.split('').join(', ');
                    webSpeechStore.setTranscriptionDisplay(result.toUpperCase());
                }

                // Web Speech API sometimes splits three letters with empty spaces between them
                // thus we have to take care of the empty spaces somehow
                if (result.length === 5) {
                    result = result.trim().replaceAll(' ', '').split('').join(', ');
                    webSpeechStore.setTranscriptionDisplay(result.toUpperCase());
                }
            } else {
                webSpeechStore.setNewTranscriptionAsTranscriptionDisplay();
            }

            if (this.wordToSay === result.toUpperCase()) {
                counterStore.incrementPoints();
                this.updateWordToSay();
            }
            webSpeechStore.updateLastTranscription();
        },

        getRandomTriplet() {
            let triplet: any[] = [];
            for (let i = 0; i < 3; i++) {
                triplet.push(this.lettersList[Math.floor(Math.random() * this.lettersList.length)]);
            }
            return triplet.toString().replaceAll(",", ", ");
        },

        getRandomIntFromInterval(min: number, max: number) {
            return Math.floor(Math.random() * (max - min + 1) + min).toString()
        },

        updateWordToSay() {
            const recognizerSliderStore = useRecognizerSliderStore();
            const webSpeechStore = useWebSpeechStore();

            webSpeechStore.stopSynthPlayback();
            webSpeechStore.stopRecognition();

            switch (recognizerSliderStore.toggleValue) {
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
    },
})
