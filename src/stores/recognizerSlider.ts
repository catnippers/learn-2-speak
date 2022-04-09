import {defineStore} from 'pinia'

export type RootState = {
    toggleValue: string;
    oldToggleValue: string;
    sliderOptions: string[];
}

export const useRecognizerSliderStore = defineStore({
    id: 'recognizerSlider',
    state: () => ({
        toggleValue: 'Alphabet',
        oldToggleValue: 'Alphabet',
        sliderOptions: ['Alphabet', '1 to 10', '1 to 100', '1 to 1000'],
    } as RootState),

    actions: {
        isNotNewAndOldToggleValuesEqual() {
            return this.toggleValue !== this.oldToggleValue;
        },

        setToggleValue(newValue: string) {
            this.toggleValue = newValue;
        },

        setOldToggleValue() {
            this.oldToggleValue = this.toggleValue;
        },
    },
})
