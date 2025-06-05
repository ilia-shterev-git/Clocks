

import LANGUAGES_ENUM from "./LanguagesEnum.js";
import LocalStorageManager from "../Utiljs/LocalStorageManager.js";

class LanguageDetector {

    "use strict";

    #currentLanguage;

    #LANG_STORAGE_KEY;

    #DEFAULT_LANGUAGE;

    constructor(LANGUAGES_ENUM, LocalStorageManager) {

        this.#DEFAULT_LANGUAGE = LANGUAGES_ENUM.English;
        this.#LANG_STORAGE_KEY = "LanguageStorageKey";
        this.#currentLanguage = this.#getSetCurrentLanguage(LANGUAGES_ENUM, LocalStorageManager);
    }

    get getCurrentLanguage() { return this.#currentLanguage; };

    saveCurrentLanguage(currentLanguage) {

        LocalStorageManager.insertSingleValue(this.#LANG_STORAGE_KEY, currentLanguage);
    }

    #getSetCurrentLanguage(LANGUAGES_ENUM, LocalStorageManager) {

        let boolIsThereLanguage;

        // First check is in the local storage. getValueNoCheck means
        // value is returned "as is" without checks. The check is performed here.
        // All check are double checked against the LANGUAGES_ENUM;
        let userLang = LocalStorageManager.getValueNoCheck(this.#LANG_STORAGE_KEY);

        if (userLang) {

            userLang = JSON.parse(userLang);

            boolIsThereLanguage = Object.values(LANGUAGES_ENUM).includes(userLang);

            if (boolIsThereLanguage === true)
                return userLang;

            userLang = LANGUAGES_ENUM.English;

            return userLang;
        }

        // If no match was found in the the local storage
        // we continue checking user's (browser's) language
        userLang = navigator.language || navigator.userLanguage;

        userLang = this.#checkAndCutLangString(userLang);

        // if current user's (browser's) language is a match in our 
        // LANGUAGES_ENUM we are good to go - return that language
        boolIsThereLanguage = Object.values(LANGUAGES_ENUM).includes(userLang);

        if (boolIsThereLanguage === true)
            return userLang;

        // if current user's (browser's) language was NOT  a match in our 
        // LANGUAGES_ENUM we will make yet another check in the list of the rest
        // of the user's (browser's) languages
        let boolIsThereAMatch = false,
            allNavigatorLanguagesArr,
            allUserLanguagesArr,
            tempNavLanguage;

        allNavigatorLanguagesArr = navigator.languages;

        allUserLanguagesArr = Object.values(LANGUAGES_ENUM);

        // Currently there 2 loops. One is for the browser's langs
        // Second is for each lang from browser I match one from the existing
        // in my lang pack.
        for (const navigatorLanguage of allNavigatorLanguagesArr) {

            // Curently I do not use localized versions of languages
            // for ex. en-us. There are not extended lang text etc.
            // So if the browser returns such string I take only the first 2 chars.
            tempNavLanguage = this.#checkAndCutLangString(navigatorLanguage);

            for (const userLanguage of allUserLanguagesArr) {

                if (tempNavLanguage === userLanguage) {

                    userLang = userLanguage;
                    boolIsThereAMatch = true;
                    break;
                }
            };

            if (boolIsThereAMatch === true)
                break;
        };

        // if after the last check in browser's list of languages
        // NO match was found  - fall back to English
        if (boolIsThereAMatch === false)
            userLang = this.#DEFAULT_LANGUAGE;

        return userLang;
    }

    // Curently I do not use localized versions of languages
    // for ex. en-us. There are not extended lang text etc.
    // So if the browser returns such string I take only the first 2 chars.
    #checkAndCutLangString(userLang) {

        if (userLang.length > 2)

            userLang = userLang.substring(0, 2)
        
        return userLang;
    }
}

const LanguageDetectorObj = new LanguageDetector(LANGUAGES_ENUM, LocalStorageManager);

export default LanguageDetectorObj;