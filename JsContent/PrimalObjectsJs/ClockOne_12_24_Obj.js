import LocalStorageManager from "../Utiljs/LocalStorageManager.js";

import ClockHelper from "../utiljs/clockhelper.js";

class ClockOne_12_24_Processor {

    "use strict";

    #LocalStorageManager;

    #isUsing_12_Display = true; #LOCAL_STORAGE_IS_USING_12_KEY;

    #RB_12; #RB_24;
    #digital_12_Switch; #digital_24_Switch; #switch_12_24_ButtonsObj;

    #clocksAMIndicator = document.getElementById('clocksAmIndicator');
    #clocksPMIndicator = document.getElementById('clocksPmIndicator');

    #clocks_12_24_Switch = document.getElementById("clocks_12_24_Switch");

    dimmingIndicatorsClass = "set-inactive";

    constructor(LocalStorageManagerArgs) {

        this.#LocalStorageManager = LocalStorageManagerArgs;

        this.#switch_12_24_ButtonsObj = {};
        this.#RB_12 = "clocks_12_Switch";
        this.#RB_24 = "clocks_24_Switch";

        this.#LOCAL_STORAGE_IS_USING_12_KEY = "isUsing_12_Key";


        this.#setAndFillUp_12_24_ButtonsObj();

        this.#localStorageGet_12_24_Status();
    }

    #setAndFillUp_12_24_ButtonsObj() {

        this.#digital_12_Switch = document.getElementById(this.#RB_12);
        this.#digital_24_Switch = document.getElementById(this.#RB_24);

        this.#switch_12_24_ButtonsObj[this.#RB_12] = this.#digital_12_Switch;
        this.#switch_12_24_ButtonsObj[this.#RB_12].boolIsSelected = true;

        this.#switch_12_24_ButtonsObj[this.#RB_24] = this.#digital_24_Switch;
        this.#switch_12_24_ButtonsObj[this.#RB_24].boolIsSelected = false;
    }

    set_24_Or_AM_PM_Hour(currentHour) {

        if (this.#isUsing_12_Display)

            currentHour = this.checkSetPMHoursOffset(currentHour);

        return currentHour;
    }

    // called when hour number changes and if AM / PM is used. If 24 hour time is used it is not called
    set_AM_PM_Indicators(currentHour) {

        if (this.#isUsing_12_Display) {

            if (currentHour < 12) {
                this.#switchAMIndicatorON()
            }
            else if (currentHour > 11) {
                this.#switchPMIndicatorON()
            }
        }
        else {

            this.switchAMPMIndicatorOFF();
        }         
    }

    // set once when Digital clock is initializing - setInit() 
    // in tern setInit() is called when StartStopAnimation button is clicked
    setInitForRadioButtonsSelection() {

        if (this.#isUsing_12_Display) {
            this.#switch_12_24_ButtonsObj[this.#RB_12].checked = true;
        }
        else {
            this.#switch_12_24_ButtonsObj[this.#RB_24].checked = true;
        }
    }

    // called in the event listener when a selection is made for 12 / 24 hour display
    // the radio button ID comes as a radioButtonTargetId
    checkTargetIdCheckIsUsing_12_Display(radioButtonTargetId) {

        const hasOwnProp = this.#switch_12_24_ButtonsObj.hasOwnProperty(radioButtonTargetId);

        if (hasOwnProp) {

            this.#isUsing_12_Display = this.#switch_12_24_ButtonsObj[radioButtonTargetId].boolIsSelected;

            this.#localStorageSet_12_24_Status()

            return this.#isUsing_12_Display
        }
    }

    #switchAMIndicatorON() {

        this.#clocksAMIndicator.classList.remove(this.dimmingIndicatorsClass);
        this.#clocksPMIndicator.classList.add(this.dimmingIndicatorsClass);
    }

    #switchPMIndicatorON() {

        this.#clocksPMIndicator.classList.remove(this.dimmingIndicatorsClass);
        this.#clocksAMIndicator.classList.add(this.dimmingIndicatorsClass);
    }

    switchAMPMIndicatorOFF() {

        this.#clocksAMIndicator.classList.add(this.dimmingIndicatorsClass);
        this.#clocksPMIndicator.classList.add(this.dimmingIndicatorsClass);
    }

    checkSetPMHoursOffset(currentHour) {

        currentHour = ClockHelper.checkSetPMHoursOffset(currentHour);

        return currentHour;
    }

    // gets var from browser's LocalStorage
    #localStorageGet_12_24_Status() {

        // second arg is default returned value
        this.#isUsing_12_Display = this.#LocalStorageManager
            .getBoolValue(this.#LOCAL_STORAGE_IS_USING_12_KEY, false);
    }

    // inesrts a value in browser's LocalStorage
    #localStorageSet_12_24_Status() {

        this.#LocalStorageManager
            .insertSingleValue(this.#LOCAL_STORAGE_IS_USING_12_KEY, this.#isUsing_12_Display);
    }

    get getClocks_12_24_Switch() { return this.#clocks_12_24_Switch };
}

const ClockOne_12_24_Obj = new ClockOne_12_24_Processor(LocalStorageManager);

export default ClockOne_12_24_Obj;