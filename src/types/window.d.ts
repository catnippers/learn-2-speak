export {};

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
        mozSpeechRecognition: any;
        msSpeechRecognition: any;
        SpeechGrammarList: any;
        webkitSpeechGrammarList: any;
        mozSpeechGrammarList: any;
        msSpeechGrammarList: any;
    }
}