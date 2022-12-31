export enum NumberToWord {
    ten,
    eleven,
    twelve,
    teen,
    twenty,
    thirty,
    forty,
    fifty,
    sixty,
    seventy,
    eighty,
    ninety,
    hundred
}
interface NumberProps {
    numberValue?: string,
    pronunciation: string,
    alternativePronunciation?: string,
    invalidPronunciation: string
}
export function getNumberProps(numberToWord: NumberToWord): NumberProps {
    switch (numberToWord) {
        case NumberToWord.ten:
            return {numberValue:'10', pronunciation: 'ten', invalidPronunciation: 'one-zero'};
        case NumberToWord.eleven:
            return {numberValue:'11', pronunciation: 'eleven', invalidPronunciation: 'one-one'};
        case NumberToWord.twelve:
            return {numberValue:'12', pronunciation: 'twelve', invalidPronunciation: 'one-two'};
        case NumberToWord.teen:
            return {pronunciation: 'teen', invalidPronunciation: 'one-something'};
        case NumberToWord.twenty:
            return {pronunciation: 'twenty', invalidPronunciation: 'two-something'};
        case NumberToWord.thirty:
            return {pronunciation: 'thirty', invalidPronunciation: 'three-something'};
        case NumberToWord.forty:
            return {pronunciation: 'forty', invalidPronunciation: 'four-something'};
        case NumberToWord.fifty:
            return {pronunciation: 'fifty', invalidPronunciation: 'five-something'};
        case NumberToWord.sixty:
            return {pronunciation: 'sixty', invalidPronunciation: 'six-something'};
        case NumberToWord.seventy:
            return {pronunciation: 'seventy', invalidPronunciation: 'seven-something'};
        case NumberToWord.eighty:
            return {pronunciation: 'eighty', invalidPronunciation: 'eight-something'};
        case NumberToWord.ninety:
            return {pronunciation: 'ninety', invalidPronunciation: 'nine-something'};
        case NumberToWord.hundred:
            return {pronunciation: 'hundred', alternativePronunciation: 'one hundred', invalidPronunciation: 'one-something'};
    }
}
