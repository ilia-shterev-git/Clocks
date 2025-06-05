
import RANGE_SLIDER_ENUM from "../Utiljs/RangeSliderEnum.js";

import LocalStorageManager from "../Utiljs/LocalStorageManager.js";

import ALARM_AND_SNOOZE_TIME_ENUM from "../Utiljs/AlarmAndSnoozeTimeEnum.js";

class ClockOneAlarmSetterProcessor {

    "use strict";

    #alarmIndicatorsObj;

    #LOCAL_STORAGE_ALARM_TIME; #alarmTimeObj; #snoozeTimeObj; #ALARM_OBJ_MAIN_PROP

    #LocalStorageManager;

    #alarmHour; alarmMinute; #intIndex; #NUMBER_OF_PAUSE_RING_CYCLES;
    #SNOOZE_DURATION_IN_MINUTES;


    #fontColorAsSegmentClass = "font-color-segment-color";
    #fontColorBlackClass = "font-color-black";
    #activeBgClass = "active-bg-color";
    #inactiveBgClass = "inactive-bg-color";

    #setInactiveClass = "set-inactive";
    #setInactiveBackgroundClass = "set-inactive-background-only";

    #alarmSetTimeLeftIndicator = document.getElementById("alarmSetTimeLeftIndicator");
    #alarmSetHourIndicator = document.getElementById("alarmSetHourIndicator");

    #alarmSetMinutesIndicator = document.getElementById("alarmSetMinutesIndicator");
    #alarmSetTimeRightIndicator = document.getElementById("alarmSetTimeRightIndicator");

    #alarmSetMainSetterIndicator = document.getElementById("alarmSetMainSetterIndicator");

    /*    ================     */

    #alarmSnoozeBtn = document.getElementById("alarmSnoozeBtn");
    get getDigitalAlarmSnoozeBtn() { return this.#alarmSnoozeBtn; };

    #alarmSnoozeSpan = document.getElementById("alarmSnoozeSpan");

    #alarmSetterRangeSlider = document.getElementById("alarmSetterRangeSlider");
    get getAlarmSetterRangeSlider() { return this.#alarmSetterRangeSlider; };

    #alarmSetterSetBtn = document.getElementById("alarmSetterSetBtn");
    get getAlarmSetterSetBtn() { return this.#alarmSetterSetBtn; };

    #alarmSettterPlusBtn = document.getElementById("alarmSetterPlusBtn");
    get getAlarmSetterPlusBtn() { return this.#alarmSettterPlusBtn; };

    #alarmSetterMinusBtn = document.getElementById("alarmSetterMinusBtn");
    get getAlarmSetterMinusBtn() { return this.#alarmSetterMinusBtn; };

    get getAlarmTimeObj() { return this.#alarmTimeObj; };

    constructor(LocalStorageManagerArgs) {

        this.#alarmIndicatorsObj = {};
        this.#snoozeTimeObj = {};

        this.#LocalStorageManager = LocalStorageManagerArgs;
        this.#intIndex = 0;
        /*this.#alarmHour = 0; this.#alarmMinute = 0;*/

        this.#setAndFillUpAlarmIndicatorsObj();

        this.#LOCAL_STORAGE_ALARM_TIME = "localStorageAlarmTime";

        const ALARM_OBJ_MAIN_PROP = "alarmObjMainProp";
        this.#ALARM_OBJ_MAIN_PROP = ALARM_OBJ_MAIN_PROP;

        this.#NUMBER_OF_PAUSE_RING_CYCLES = 5;

        this.#SNOOZE_DURATION_IN_MINUTES = 1;

        this.#localStorageGetAlarmTimeObj();
    }

    get getAlarmObjMainProp() { return this.#ALARM_OBJ_MAIN_PROP; };

    //       #activeBgClass = "active-bg-color";
   // #inactiveBgClass = "alarm-snooze-inactive-color";

    setSnoozeBtnHintingColors() {

        this.#alarmSnoozeBtn.classList.remove(this.#activeBgClass);
        this.#alarmSnoozeBtn.classList.add(this.#inactiveBgClass);

        this.#alarmSnoozeSpan.classList.remove(this.#fontColorBlackClass);
        this.#alarmSnoozeSpan.classList.add(this.#fontColorAsSegmentClass);
    }


    setSnoozeBtnActiveColors() {

        this.#alarmSnoozeBtn.classList.remove(this.#inactiveBgClass);
        this.#alarmSnoozeBtn.classList.add(this.#activeBgClass);

        this.#alarmSnoozeSpan.classList.remove(this.#fontColorAsSegmentClass);
        this.#alarmSnoozeSpan.classList.add(this.#fontColorBlackClass);
    }

    setSnoozeBtnInactiveColors() {

        this.#alarmSnoozeBtn.classList.remove(this.#activeBgClass);
        this.#alarmSnoozeBtn.classList.add(this.#inactiveBgClass);

        this.#alarmSnoozeSpan.classList.remove(this.#fontColorAsSegmentClass);
        this.#alarmSnoozeSpan.classList.add(this.#fontColorBlackClass);
    }

    disposeOfSnoozeObj() {

        if (this.#snoozeTimeObj[this.#ALARM_OBJ_MAIN_PROP]) {

            delete this.#snoozeTimeObj[this.#ALARM_OBJ_MAIN_PROP];
        }
    }

    setSnoozeObj() {

        let tempDate = new Date();

        tempDate = new Date(tempDate.getTime() + this.#SNOOZE_DURATION_IN_MINUTES * 60 * 1000);

        // I use this object not directly but through a fixed property disposeOfSnoozeObj
        // as property will be easer to delete and reset object
        this.#snoozeTimeObj[this.#ALARM_OBJ_MAIN_PROP] = this.#setGenericAlarmOrSnoozeObj(tempDate);

        return this.#snoozeTimeObj;
    }

    setNewAlarmObjFromLocalStorage(alarmHour, alarmMinute) {

        let tempDate = new Date()
            , alarmTimeObj = {};

        tempDate = this.#resetHourAndMinute(tempDate, alarmHour, alarmMinute);

        // I use this object not directly but through a fixed property 
        // as property will be easer to delete and reset object
        alarmTimeObj[this.#ALARM_OBJ_MAIN_PROP] = this.#setGenericAlarmOrSnoozeObj(tempDate);

        return alarmTimeObj;
    }

    resetExistingAlarmObj(alarmHour, alarmMinute, alarmTimeObj) {

        delete alarmTimeObj[this.#ALARM_OBJ_MAIN_PROP];

        let tempDate = new Date();

        tempDate = this.#resetHourAndMinute(tempDate, alarmHour, alarmMinute);

        // I use this object not directly but through a fixed property 
        // as property will be easer to delete and reset object
        alarmTimeObj[this.#ALARM_OBJ_MAIN_PROP] = this.#setGenericAlarmOrSnoozeObj(tempDate);

        return alarmTimeObj;
    }

    #resetHourAndMinute(tempDate, alarmHour, alarmMinute) {

        tempDate.setHours(alarmHour);
        tempDate.setMinutes(alarmMinute);

        return tempDate;
    }

    #setGenericAlarmOrSnoozeObj(baseDate) {

        let tempDate; /*this.#alarmMinuteObj = {};*/

        let genericAlarmOrSnoozeObj = {};

        for (this.#intIndex = 0; this.#intIndex <= this.#NUMBER_OF_PAUSE_RING_CYCLES; this.#intIndex++) {

            tempDate = new Date(baseDate.getTime() + this.#intIndex * 60 * 1000);

            if (this.#intIndex === 0) {

                genericAlarmOrSnoozeObj[tempDate.getMinutes().toString()]
                    = this.#setHourObj(tempDate, ALARM_AND_SNOOZE_TIME_ENUM.StartAll);
            }
            else if (this.#intIndex === this.#NUMBER_OF_PAUSE_RING_CYCLES) {

                genericAlarmOrSnoozeObj[tempDate.getMinutes().toString()]
                    = this.#setHourObj(tempDate, ALARM_AND_SNOOZE_TIME_ENUM.EndAll);
            }
            else {

                let tempInt;

                if (this.#intIndex % 2 === 0)

                    tempInt = ALARM_AND_SNOOZE_TIME_ENUM.StartAlarm;

                else

                    tempInt = ALARM_AND_SNOOZE_TIME_ENUM.PauseAlarm;


                genericAlarmOrSnoozeObj[tempDate.getMinutes().toString()]
                    = this.#setHourObj(tempDate, tempInt);
            }
        }

        // I use this var in multiples of places. So I am reseting it.
        this.#intIndex === 0

        return genericAlarmOrSnoozeObj;
    }

    #setHourObj(currentTime, enumValue) {

        let tempObj = {};

        tempObj[currentTime.getHours().toString()] = enumValue;

        return tempObj;
    }

    #localStorageGetAlarmTimeObj() {

        this.#alarmTimeObj = this.#LocalStorageManager
            .getObjectValue(this.#LOCAL_STORAGE_ALARM_TIME);

        if (this.#alarmTimeObj === null) {

            this.#crateNewAlarmTimeObj(0, 22)
        }
    }

    localStorageSaveAlarmTimeObj(alarmHour, alarmMinute) {

        this.#crateNewAlarmTimeObj(alarmHour, alarmMinute)

        this.#LocalStorageManager
            .insertObjectValue(this.#LOCAL_STORAGE_ALARM_TIME, this.#alarmTimeObj);
    };

    #crateNewAlarmTimeObj(hourValue, minuteValue) {

        this.#alarmTimeObj = {
            alarmHour: hourValue,
            alarmMinute: minuteValue
        }
    }

    #setAndFillUpAlarmIndicatorsObj() {

        this.#alarmIndicatorsObj[RANGE_SLIDER_ENUM.AlarmTimeLeftPosition.toString()] = this.#alarmSetTimeLeftIndicator;
        this.#alarmIndicatorsObj[RANGE_SLIDER_ENUM.AlarmHour.toString()] = this.#alarmSetHourIndicator;
        this.#alarmIndicatorsObj[RANGE_SLIDER_ENUM.AlarmMinute.toString()] = this.#alarmSetMinutesIndicator;
        this.#alarmIndicatorsObj[RANGE_SLIDER_ENUM.AlarmTimeRightPosition.toString()] = this.#alarmSetTimeRightIndicator;
    }

    setAlarmSettingIndicators(strNewIndex, strOldIndex) {

        this.#alarmIndicatorsObj[strNewIndex].classList.remove(this.#setInactiveBackgroundClass);
        this.#alarmIndicatorsObj[strOldIndex].classList.add(this.#setInactiveBackgroundClass);
    }

    setInitMainAndTimeIndicator() {

        this.#alarmSetMainSetterIndicator.classList.remove(this.#setInactiveClass);
        this.#alarmIndicatorsObj[RANGE_SLIDER_ENUM.AlarmTimeLeftPosition.toString()].classList.remove(this.#setInactiveBackgroundClass);
    }

}

const ClockOneAlarmSetterObj = new ClockOneAlarmSetterProcessor(LocalStorageManager);

export default ClockOneAlarmSetterObj;