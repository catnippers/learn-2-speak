import {defineStore} from 'pinia'
import {useWebSpeechStore} from "@/stores/webSpeech";
import {EN_US_ALPHABET, PL_PL_ALPHABET} from "@/data/alphabets";

export type RootState = {
    lettersList: string;
    grammarList: string;
}

export const useWordsStore = defineStore({
    id: 'words',

    state: () => ({
        lettersList: EN_US_ALPHABET,
        grammarList: "#JSGF V1.0; grammar alphabet; public <alphabet> = A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y | Z ;"
    } as RootState),

    actions: {
        updateLettersList() {
            const webSpeechStore = useWebSpeechStore();

            switch (webSpeechStore.getCurrentLanguage()) {
                case "pl-PL": {
                    this.lettersList = PL_PL_ALPHABET;
                    break;
                }
                default: {
                    this.lettersList = EN_US_ALPHABET;
                    break;
                }
            }
        },
    }
})
