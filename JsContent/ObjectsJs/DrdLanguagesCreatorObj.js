

import LanguageDetectorObj from "../LanguagesManager/LanguageDetector.js";
import jsonCreatorForDrd from "../LanguagesManager/jsonCreatorForLangsDrd.js";

class DrdLanguagesCreator {

    #drdLanguageOptions = document.getElementById("languageOptions");
    get getDrdLanguages() { return this.#drdLanguageOptions; };

    #currentLanguage;

    constructor() {

        this.#currentLanguage = LanguageDetectorObj.getCurrentLanguage;

        this.#setLanguagesDrd_PresetValue(jsonCreatorForDrd);
    }

    //get getCurrentLanguage() { return this.#currentLanguage; };

    #setLanguagesDrd_PresetValue(jsonCreatorForDrd) {

        // this also works - I put one option in the HTML, here I am removing it
        //this.#drdLanguageOptions.options.length = 0;

        this.#drdLanguageOptions.replaceChildren();
        // ----------------

        let languagesForDrd = jsonCreatorForDrd();

        languagesForDrd = JSON.parse(languagesForDrd);

        languagesForDrd.forEach(language => {

            const option = document.createElement("option");

            option.value = language.langAbreviation;
            option.textContent = language.langName;

            if (option.value === this.#currentLanguage) {
                option.selected = true;
            }

            this.#drdLanguageOptions.appendChild(option);
        });
    }
}

const DrdLanguagesCreatorObj = new DrdLanguagesCreator();

export default DrdLanguagesCreatorObj;