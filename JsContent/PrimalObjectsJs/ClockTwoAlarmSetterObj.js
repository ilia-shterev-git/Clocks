

import LocalStorageManager from "../Utiljs/LocalStorageManager.js";

import ALARM_AND_SNOOZE_TIME_ENUM from "../Utiljs/AlarmAndSnoozeTimeEnum.js";

class ClockTwoAlarmSetterProcessor {

    #LocalStorageManager

    #snoozeTimeObj; #intIndex; #ALARM_OBJ_MAIN_PROP; #ALARM_DURATION_IN_MINUTES;
    #LOCAL_STORAGE_ALARM_TOTAL_MINUTES; #LOCAL_STORAGE_IS_ALARM_ON_KEY;

    #alarmSettterPlusBtn = document.getElementById("analogAlarmSetterPlusBtn");
    get getAlarmSetterPlusBtn() { return this.#alarmSettterPlusBtn; };

    #alarmSetterMinusBtn = document.getElementById("analogAlarmSetterMinusBtn");
    get getAlarmSetterMinusBtn() { return this.#alarmSetterMinusBtn; };

    /*get getAlarmTimeObj() { return this.#alarmTimeObj; };*/

    setNewAlarmObj(alarmHour, alarmMinute) {

        let tempDate = new Date()
            , alarmTimeObj = {};

        tempDate = this.#resetHourAndMinute(tempDate, alarmHour, alarmMinute);

        // I use this object not directly but through a fixed property 
        // as property will be easer to delete and reset object
        alarmTimeObj[this.#ALARM_OBJ_MAIN_PROP] = this.#setGenericAlarmOrSnoozeObj(tempDate);

        return alarmTimeObj;
    }

    calculateAlarmMinuteFromTotalMinutes(TOTAL_OF_MINUTES) {

        let alarmMinute = TOTAL_OF_MINUTES % 60;

        return alarmMinute;
    }

    calculateAlarmHourFromTotalMinutes(TOTAL_OF_MINUTES) {

        let alarmHour = TOTAL_OF_MINUTES / 60;;

        alarmHour = Math.floor(alarmHour);

        if (alarmHour === 0)
            alarmHour = 12;
        
        return alarmHour;
    }

    #setGenericAlarmOrSnoozeObj(baseDate) {

        let tempDate;

        let genericAlarmOrSnoozeObj = {};

        genericAlarmOrSnoozeObj[baseDate.getMinutes().toString()]
            = this.#setHourObj(baseDate, ALARM_AND_SNOOZE_TIME_ENUM.StartAll);

        tempDate = new Date(baseDate.getTime() + this.#ALARM_DURATION_IN_MINUTES * 60 * 1000);

        genericAlarmOrSnoozeObj[tempDate.getMinutes().toString()]
            = this.#setHourObj(tempDate, ALARM_AND_SNOOZE_TIME_ENUM.EndAll);

        return genericAlarmOrSnoozeObj;
    }

    #setHourObj(currentTime, enumValue) {

        let tempObj = {};

        tempObj[currentTime.getHours().toString()] = enumValue;

        return tempObj;
    }

    #resetHourAndMinute(tempDate, alarmHour, alarmMinute) {

        tempDate.setHours(alarmHour);
        tempDate.setMinutes(alarmMinute);

        return tempDate;
    }

    constructor(LocalStorageManagerArgs) {

        this.#snoozeTimeObj = {};

        this.#LocalStorageManager = LocalStorageManagerArgs;
        this.#intIndex = 0;

        this.#LOCAL_STORAGE_ALARM_TOTAL_MINUTES = "localStorageAlarmTotalMinutes";

        this.#LOCAL_STORAGE_IS_ALARM_ON_KEY = "isAlarmOn";

        const ALARM_OBJ_MAIN_PROP = "alarmObjMainProp";
        this.#ALARM_OBJ_MAIN_PROP = ALARM_OBJ_MAIN_PROP;

        const ALARM_DURATION_IN_MINUTES = 1;
        this.#ALARM_DURATION_IN_MINUTES = ALARM_DURATION_IN_MINUTES;

    }

    // gets this.#boolIsAlarmOn from browser's LocalStorage
    localStorageGetAlarmOnOff() {

        // second arg is default returned value
        return this.#LocalStorageManager
            .getBoolValue(this.#LOCAL_STORAGE_IS_ALARM_ON_KEY, false);
    }

    // inesrts a value in browser's LocalStorage
    localStorageSetAlarmOnOff(boolIsAlarmOn) {

        this.#LocalStorageManager
            .insertSingleValue(this.#LOCAL_STORAGE_IS_ALARM_ON_KEY, boolIsAlarmOn);
    }

    localStorageGetAlarmTotalMinutes() {

        let totalMinutes = this.#LocalStorageManager
            .getSingleValue(this.#LOCAL_STORAGE_ALARM_TOTAL_MINUTES, 0);

        return totalMinutes;
    };

    localStorageSaveAlarmTotalMinutes(totalMinutes) {

        this.#LocalStorageManager
            .insertSingleValue(this.#LOCAL_STORAGE_ALARM_TOTAL_MINUTES, totalMinutes);
    };

    get getAlarmObjMainProp() { return this.#ALARM_OBJ_MAIN_PROP; };
}

const ClockTwoAlarmSetterObj = new ClockTwoAlarmSetterProcessor(LocalStorageManager);

export default ClockTwoAlarmSetterObj;