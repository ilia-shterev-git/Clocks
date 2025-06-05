
import LocalStorageManager from "../Utiljs/LocalStorageManager.js";

class ClockOneDotsColsProcessor {

    "use strict";

    #LocalStorageManager;
    #LOCAL_STORAGE_IS_RIGHT_DOTS_BLINKING_KEY;
    #isRightDotsBlinking;

    #rightDots = document.getElementById("clocksRightDotsWrapper");
    #leftDots = document.getElementById("clocksLeftDotsWrapper");

    #dotsMark = document.getElementById("dotsMark");

    #dimmingDotsClass = "dim-dots";
    #setInactiveDotsMarkClass = "set-inactive";

    #dotsCheckBoxSwitch = document.getElementById("dotsCheckBoxSwitch");

    get getDotsCheckBoxSwitch() { return this.#dotsCheckBoxSwitch; };

    constructor(LocalStorageManagerArg) {

        this.#LocalStorageManager = LocalStorageManagerArg;

        this.#LOCAL_STORAGE_IS_RIGHT_DOTS_BLINKING_KEY = "isRightDotsBlinkingKey";

        this.#localStorageGetRightDotsBlinking();
    }

    rightDotsSwitchON() {

        this.#rightDots.classList.remove(this.#dimmingDotsClass);
    }

    // sets this.#isRightDotsBlinking which is in #DotsColsObj. 
    // This var plays role in the main flow - setInterval.
    // Gives the dots "initial push", i.e. sets them visible or not.
    setRightDotsBlinkingOrStatic_SetChoiceInLocalStorage(isRightDotsBlinking) {

        this.#isRightDotsBlinking = isRightDotsBlinking;

        if (this.#isRightDotsBlinking === true) {

            this.#rightDots.classList.add(this.#dimmingDotsClass);
            /*this.#dotsMark.classList.add(this.#setInactiveDotsMarkClass);*/
        }
        else {

            this.#rightDots.classList.remove(this.#dimmingDotsClass);
            /*this.#dotsMark.classList.remove(this.#setInactiveDotsMarkClass);*/
        }

        this.#localStorageSetRightDotsBlinking();
    }

    rightsDotsSwitchOFF() {

        this.#rightDots.classList.add(this.#dimmingDotsClass);
    }

    setInitForDotsColsAndCheckBox() {

        this.#dotsCheckBoxSwitch.checked = this.#isRightDotsBlinking;
        this.#dotsMark.classList.remove(this.#setInactiveDotsMarkClass);

        this.#rightDots.classList.remove(this.#dimmingDotsClass);
        this.#leftDots.classList.remove(this.#dimmingDotsClass);

        return this.#isRightDotsBlinking;
    }

    // gets this.#boolIsAlarmOn from browser's LocalStorage
    #localStorageGetRightDotsBlinking() {

        // second arg is default returned value
        this.#isRightDotsBlinking = this.#LocalStorageManager
            .getBoolValue(this.#LOCAL_STORAGE_IS_RIGHT_DOTS_BLINKING_KEY, true);
    }

    // inesrts a value in browser's LocalStorage
    #localStorageSetRightDotsBlinking() {

        this.#LocalStorageManager
            .insertSingleValue(this.#LOCAL_STORAGE_IS_RIGHT_DOTS_BLINKING_KEY, this.#isRightDotsBlinking);
    }

}

const ClockOneDotsColsObj = new ClockOneDotsColsProcessor(LocalStorageManager);

    export default ClockOneDotsColsObj;
