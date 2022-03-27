export {};

declare global {
    // https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
    interface SpeechRecognizer {
        grammars: any;
        lang: any;
        continuous: boolean;
        interimResults: boolean;
        maxAlternatives: number;
        abort(): any;
        start(): any;
        stop(): any;
        addEventListener(eventName: string, listener: EventListener): any;
        /*
            Possible Events:
            - audiostart
            - audioend
            - end
            - error
            - nomatch
            - result
            - soundstart
            - soundend
            - speechstart
            - speechend
            - start
         */
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/SpeechGrammarList
    interface SpeechGrammarList {
        length: number;
        item(): any;
        addFromURI(source: string, weight: number);
        addFromString(sourceString: string, weight: number): any;
    }
}