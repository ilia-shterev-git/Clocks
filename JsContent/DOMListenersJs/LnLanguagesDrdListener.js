

import LANGUAGES_ENUM from "../LanguagesManager/LanguagesEnum.js";

export default class LnLanguagesDrdListener  {

    "use strict";

    #observers; #newLanguageOption;

    constructor(DrdLanguagesCreatorArgs) {

        this.drdLanguages = DrdLanguagesCreatorArgs.getDrdLanguages;

        this.#addDrdChangeListener();

        this.#observers = [];
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    // Method to remove an observer from the list
    removeObserver(observer) {
        this.#observers = this.observers.filter(obs => obs !== observer);
    }

    #notifyObservers() {
        this.#observers.forEach(observer => {
            // Call the update method on each observer
            observer.updateCurrentLanguage(this.#newLanguageOption);
        });
    }

    #addDrdChangeListener() {

        this.drdLanguages.addEventListener("change", this.#callBackForListener.bind(this));
    };

    #callBackForListener(event) {

        this.#newLanguageOption = event.target.value;

        if (Object.values(LANGUAGES_ENUM).includes(this.#newLanguageOption) === false)
            return;

        this.#notifyObservers();
    }
}
