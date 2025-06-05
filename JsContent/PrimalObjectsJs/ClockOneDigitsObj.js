
import ClockHelper from "../utiljs/clockhelper.js";

class ClockOneDigits {

"use strict";

    DIGITS_PAIR_ENUM;
    DIGITS_DOM_ELEMENTS_SET;

    #ClockHelper;

    #baseClassValue = 'display-numb-';
    #classToDisableDigit = 'None';

    constructor(ClockHelper) {

        this.#fillUpDigitsPairEnum();

        this.#ClockHelper = ClockHelper;
    }

    setDigitsPairToDisabled(PAIRING_ENUM_Any) {

        PAIRING_ENUM_Any.LEFT_Digit.className
            = this.#baseClassValue + this.#classToDisableDigit;

        PAIRING_ENUM_Any.RIGHT_Digit.className
            = this.#baseClassValue + this.#classToDisableDigit;
    }

    #pairDomElementsToClasses(strValuesCouple, PAIRING_ENUM_Any) {

        PAIRING_ENUM_Any.LEFT_Digit.className
            = this.#baseClassValue + strValuesCouple[0];

        PAIRING_ENUM_Any.RIGHT_Digit.className
            = this.#baseClassValue + strValuesCouple[1];
    }


    setDigitsPair(currentValue, PAIRING_ENUM_Any) {

        let strValuesCouple = this.#ClockHelper.getStringFromNumber(currentValue);

        this.#pairDomElementsToClasses(strValuesCouple, PAIRING_ENUM_Any)
    }



    #fillUpDigitsPairEnum() {

        this.DIGITS_PAIRS_ENUM = {

            HOURS: {
                LEFT_Digit: document.getElementById('clock-1-hrs-left-digit')
                , RIGHT_Digit: document.getElementById('clock-1-hrs-right-digit')
            },

            MINUTES: {
                LEFT_Digit: document.getElementById('clock-1-mins-left-digit')
                , RIGHT_Digit: document.getElementById('clock-1-mins-right-digit')
            },

            SECONDS: {
                LEFT_Digit: document.getElementById('clock-1-seconds-left-digit')
                , RIGHT_Digit: document.getElementById('clock-1-seconds-right-digit')
            }
        }
    }
}

const ClockOneDigitsObj = new ClockOneDigits(ClockHelper);

export default ClockOneDigitsObj;