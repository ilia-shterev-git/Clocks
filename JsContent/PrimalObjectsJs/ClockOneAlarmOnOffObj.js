

import LocalStorageManager from "../Utiljs/LocalStorageManager.js";

class ClockOneAlarmOnOffProcessor {

    "use strict";

    #LocalStorageManager;

    #RB_ON; #RB_OFF; #boolIsAlarmOn;

    #digitalOffSwitch;
    #digitalOnSwitch;

    #alarmButtonsObj;

    #alarmOffMark = document.getElementById("alarmOffMark");
    #alarmOnMark = document.getElementById("alarmOnMark");

    #digitalAlarmOnOffSwitch = document.getElementById("digitalAlarmOnOffSwitch");

    get getDigitalAlarmOnOffSwitch() { return this.#digitalAlarmOnOffSwitch; }; 
    get getAlarmOnOffStatus() { return this.#boolIsAlarmOn; };

    #setInactiveClass = "set-inactive";

    #tempValue; #LOCAL_STORAGE_IS_ALARM_ON_KEY; #LOCAL_STORAGE_PROPERTY_NAME;

    constructor(LocalStorageManagerArgs) {

        this.#LocalStorageManager = LocalStorageManagerArgs;

        /*this.#tempValue = ""; this.#localStorageAlarmObj = {};  digitalAlarmOnOffSwitch  */

        this.#alarmButtonsObj = {};

        this.#LOCAL_STORAGE_IS_ALARM_ON_KEY = "isAlarmOnKey";
        this.#LOCAL_STORAGE_PROPERTY_NAME = "isAlarmOn";

        this.#RB_ON = "digitalOnSwitch";
        this.#RB_OFF = "digitalOffSwitch";

        this.#setAndFillUpAlarmButtonsObj();

        this.#localStorageGetAlarmOnOff()
    }

    /// called when alarm radio button is selected
    checkTargetIdCheckAlarmOnOffStatus(radioButtonTargetId) {

        const hasOwnProp = this.#alarmButtonsObj.hasOwnProperty(radioButtonTargetId);

        if (hasOwnProp) {

            this.#boolIsAlarmOn = this.#alarmButtonsObj[radioButtonTargetId].boolIsSelected;

            this.#localStorageSetAlarmOnOff();

            return this.#boolIsAlarmOn;
        }
    }

    // set once when Digital clock is initializing - setInit() 
    // in tern setInit() is called when StartStopAnimation button is clicked
    setInitForRadioButtonsSelection() {

        if (this.#boolIsAlarmOn === true) {

            this.#alarmButtonsObj[this.#RB_ON].checked = true;
            this.setAlarmOnMarkActive();
        }
        else {

            this.#alarmButtonsObj[this.#RB_OFF].checked = true;
            this.setAlarmOffMarkActive();
        }
    }

    setAlarmOnMarkActive() {

        this.#alarmOnMark.classList.remove(this.#setInactiveClass);
        this.#alarmOffMark.classList.add(this.#setInactiveClass);
    }

    setAlarmOffMarkActive() {

        this.#alarmOnMark.classList.add(this.#setInactiveClass);
        this.#alarmOffMark.classList.remove(this.#setInactiveClass);
    }

    #setAndFillUpAlarmButtonsObj() {

        this.#digitalOnSwitch = document.getElementById(this.#RB_ON);
        this.#digitalOffSwitch = document.getElementById(this.#RB_OFF);

        this.#alarmButtonsObj[this.#RB_ON] = this.#digitalOnSwitch;
        this.#alarmButtonsObj[this.#RB_ON].boolIsSelected = true;

        this.#alarmButtonsObj[this.#RB_OFF] = this.#digitalOffSwitch;
        this.#alarmButtonsObj[this.#RB_OFF].boolIsSelected = false;
    }

    // gets this.#boolIsAlarmOn from browser's LocalStorage
    #localStorageGetAlarmOnOff() {

        // second arg is default returned value
        this.#boolIsAlarmOn = this.#LocalStorageManager
            .getBoolValue(this.#LOCAL_STORAGE_IS_ALARM_ON_KEY, false);
    }

    // inesrts a value in browser's LocalStorage
    #localStorageSetAlarmOnOff() {

        this.#LocalStorageManager
            .insertSingleValue(this.#LOCAL_STORAGE_IS_ALARM_ON_KEY, this.#boolIsAlarmOn);
    }

}

const ClockOneAlarmOnOffObj = new ClockOneAlarmOnOffProcessor(LocalStorageManager);

export default ClockOneAlarmOnOffObj;