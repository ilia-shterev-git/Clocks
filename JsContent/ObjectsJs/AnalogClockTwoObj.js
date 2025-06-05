


import ClockHelper from "../utiljs/ClockHelper.js";

import ALARM_AND_SNOOZE_TIME_ENUM from "../Utiljs/AlarmAndSnoozeTimeEnum.js";

import ClockOneAlarmSetterObj from "../PrimalObjectsJs/ClockTwoAlarmSetterObj.js";

import ClockTwoAlarmAudioObj from "../PrimalObjectsJs/ClockTwoAlarmAudioObj.js";

class AnalogClockTwo {

    "use strict";

    #AlarmSetterObj; #ClockTwoAlarmAudioObj;

    #boolIsClockRunning; #boolIsInterruptRequest;

    #secondsRatio; #minutesRatio; #hoursRatio;

    #currentMinute; #oldMinute; #currentHour;

    #alarmMinute; #alarmHour; #alarmTimeObj; #boolIsAlarmOn;

    #localCounter; #incrementValue; #intIndex;

    #boolIsAlarmPlusBtnPressed; #boolIsAlarmMinusBtnPressed;

    #secondsDailyBgColor = 'seconds-daily-bg-color';
    #secondsNightlyBgColor = 'seconds-nightly-bg-color';
   
    #handsRotationProperty = '--handsRotationProperty';

    #hourHand = document.querySelector('[data-hour-hand]');
    #minuteHand = document.querySelector('[data-minute-hand]');
    #secondHand = document.querySelector('[data-second-hand]');
    #centeredSecondCircle = document.querySelector('[data-centered-second-circle]');
    #secondHandCounterBalance = document.querySelector('[data-second-hand-counter-balance]');
    #alarmHand = document.getElementById("analogAlarmHand");

    #analogAlarmOnOffBtn = document.getElementById("analogAlarmOnOffBtn");

    #displayAlarmMinute = document.getElementById("displayAlarmMinute");
    #displayAlarmHour = document.getElementById("displayAlarmHour");

    #ALARM_OBJ_MAIN_PROP; #TOTAL_OF_MINUTES;
    constructor(ClockOneAlarmSetterArgs, ClockTwoAlarmAudioArgs) {

        this.#AlarmSetterObj = ClockOneAlarmSetterArgs;

        this.#ClockTwoAlarmAudioObj = ClockTwoAlarmAudioArgs;

        const ALARM_OBJ_MAIN_PROP = this.#AlarmSetterObj.getAlarmObjMainProp;
        this.#ALARM_OBJ_MAIN_PROP = ALARM_OBJ_MAIN_PROP;

        this.#boolIsClockRunning = false;;

        this.#boolIsInterruptRequest = false; 

        this.#boolIsAlarmPlusBtnPressed = false;  this.#boolIsAlarmMinusBtnPressed = false;

        this.#secondsRatio=0;
        this.#minutesRatio = 0;
        this.#hoursRatio = 0;

        this.#currentMinute = 0; this.#oldMinute = -1;

        this.#localCounter = 0; this.#incrementValue = 0, this.#intIndex = 0;

        this.DEGREES_PER_ONE_MINUTE = 0.5;
        this.TOTAL_OF_DEGREES = 0;

        this.#boolIsAlarmOn = this.#AlarmSetterObj.localStorageGetAlarmOnOff();

        this.#clearAlarmTimeDislay();

        this.#TOTAL_OF_MINUTES = this.#AlarmSetterObj.localStorageGetAlarmTotalMinutes();

        this.#calculateAlarmMinuteAndHourFromTotalMinutes()

        this.#alarmTimeObj = this.#AlarmSetterObj.setNewAlarmObj(this.#alarmHour, this.#alarmMinute);
    }

    setDailySeconds() {

        this.#secondHand.classList.remove(this.#secondsNightlyBgColor);
        this.#centeredSecondCircle.classList.remove(this.#secondsNightlyBgColor);
        this.#secondHandCounterBalance.classList.remove(this.#secondsNightlyBgColor);

        this.#secondHand.classList.add(this.#secondsDailyBgColor);
        this.#centeredSecondCircle.classList.add(this.#secondsDailyBgColor);
        this.#secondHandCounterBalance.classList.add(this.#secondsDailyBgColor);
    }

    setNightlySeconds() {

        this.#secondHand.classList.remove(this.#secondsDailyBgColor);
        this.#centeredSecondCircle.classList.remove(this.#secondsDailyBgColor);
        //this.#secondHandCounterBalance.classList.remove(this.#secondsDailyBgColor);

        this.#secondHand.classList.add(this.#secondsNightlyBgColor);
        this.#centeredSecondCircle.classList.add(this.#secondsNightlyBgColor);
        //this.#secondHandCounterBalance.classList.add(this.#secondsNightlyBgColor);
    }

    cbOnAlarmOnOffBtn() {

        if (this.#boolIsAlarmOn === true) {

            this.#analogAlarmOnOffBtn.classList.add("analog-clock-two-off-position");

            this.#boolIsAlarmOn = false;
        }
        else {

            this.#analogAlarmOnOffBtn.classList.remove("analog-clock-two-off-position");

            this.#boolIsAlarmOn = true;
        }

        this.#AlarmSetterObj.localStorageSetAlarmOnOff(this.#boolIsAlarmOn);
    }

    cbOnAlarmOnOffBtn_TransitionEnd() {

        if (this.#boolIsAlarmOn === true) {

            this.#checkForAlarmTime_SignalAlarm()
        }
        else {

            this.#ClockTwoAlarmAudioObj.stopAlarmSound();
        }
    }

    clocksMainProcessAndDisplay(currentDate) {

        this.#currentMinute = currentDate.getMinutes();
        this.#currentHour = currentDate.getHours();

        this.#secondsRatio = currentDate.getSeconds() / 60;
        this.#minutesRatio = (this.#secondsRatio + this.#currentMinute) / 60;
        this.#hoursRatio = (this.#minutesRatio + currentDate.getHours()) / 12;

        this.#setRotation(this.#secondHand, this.#secondsRatio);
        this.#setRotation(this.#secondHandCounterBalance, this.#secondsRatio);
        this.#setRotation(this.#minuteHand, this.#minutesRatio);
        this.#setRotation(this.#hourHand, this.#hoursRatio);

        // Making sure alarm time is checked only once per minute.
        // At the beggining of the minute.
        if (this.#currentMinute !== this.#oldMinute) {

            this.#oldMinute = this.#currentMinute;

            if (this.#boolIsAlarmOn === true) {

                this.#checkForAlarmTime_SignalAlarm();
            }
        }
    }

    #checkForAlarmTime_SignalAlarm() {

        if (this.#alarmTimeObj[this.#ALARM_OBJ_MAIN_PROP].hasOwnProperty(this.#currentMinute.toString())) {

            this.#currentHour = ClockHelper.checkSetPMHoursOffset(this.#currentHour);

            if (this.#alarmTimeObj[this.#ALARM_OBJ_MAIN_PROP][this.#currentMinute.toString()].hasOwnProperty(this.#currentHour.toString()) === false)
                return;

            let localIndex = this.#alarmTimeObj[this.#ALARM_OBJ_MAIN_PROP][this.#currentMinute.toString()][this.#currentHour.toString()];

            if (localIndex === ALARM_AND_SNOOZE_TIME_ENUM.StartAll) {

                this.#ClockTwoAlarmAudioObj.playAlarmSound();
            }
            else if (localIndex === ALARM_AND_SNOOZE_TIME_ENUM.EndAll) {

                this.#ClockTwoAlarmAudioObj.stopAlarmSound();
            }
        }
    }

    // Main process for the Alarm Setter
    alarmSettingsMainProcessAndDisplay() {

        if (this.#localCounter === this.#incrementValue) {

            if (this.#boolIsAlarmPlusBtnPressed === true) {

                this.currentPlusOrMinusFunction = () => {
                    this.#TOTAL_OF_MINUTES = this.#TOTAL_OF_MINUTES + 1;
                    if (this.#TOTAL_OF_MINUTES >= 720)
                        this.#TOTAL_OF_MINUTES = 0;
                };

                if (this.#intIndex < 3) {

                    this.#executeOrder66(10);
                }
                else if (this.#intIndex < 7) {

                    this.#executeOrder66(4);
                }
                else {

                    this.#executeOrder66(2);
                }
            }
            else if (this.#boolIsAlarmMinusBtnPressed === true) {

                this.currentPlusOrMinusFunction = () => {
                    this.#TOTAL_OF_MINUTES = this.#TOTAL_OF_MINUTES - 1;
                    if (this.#TOTAL_OF_MINUTES < 0)
                        this.#TOTAL_OF_MINUTES = 719;
                };

                if (this.#intIndex < 3) {

                    this.#executeOrder66(12);
                }
                else if (this.#intIndex < 9) {

                    this.#executeOrder66(5);
                }
                else {

                    this.#executeOrder66(2);
                }
            }

            this.TOTAL_OF_DEGREES = this.#TOTAL_OF_MINUTES * this.DEGREES_PER_ONE_MINUTE;

            this.#alarmHand.style.setProperty(this.#handsRotationProperty, this.TOTAL_OF_DEGREES);

            this.#calculateAlarmMinuteAndHourFromTotalMinutes();

            this.#setAlarmTimeDislay();
        }

        this.#localCounter++;
    }

    #calculateAlarmMinuteAndHourFromTotalMinutes() {

        this.#alarmMinute = this.#AlarmSetterObj.calculateAlarmMinuteFromTotalMinutes(this.#TOTAL_OF_MINUTES);

        this.#alarmHour = this.#AlarmSetterObj.calculateAlarmHourFromTotalMinutes(this.#TOTAL_OF_MINUTES);
    }

    cbOnAlarmSetterMinusBtn(boolIsAlarmMinusBtnPressed) {

        if (boolIsAlarmMinusBtnPressed === true) {

            this.#boolIsInterruptRequest = true;
            this.#boolIsAlarmMinusBtnPressed = true;
        }
        else {

            this.#boolIsInterruptRequest = false;
            this.#boolIsAlarmMinusBtnPressed = false;
            this.#localCounter = 0; this.#incrementValue = 0, this.#intIndex = 0;
            this.#AlarmSetterObj.localStorageSaveAlarmTotalMinutes(this.#TOTAL_OF_MINUTES);
            this.#alarmTimeObj = this.#AlarmSetterObj.setNewAlarmObj(this.#alarmHour, this.#alarmMinute);
        }
    }

    cbOnAlarmSetterPlusBtn(boolIsAlarmPlusBtnPressed) {

        if (boolIsAlarmPlusBtnPressed===true) {

            this.#boolIsInterruptRequest = true;
            this.#boolIsAlarmPlusBtnPressed = true;
        }
        else {

            this.#boolIsInterruptRequest = false;
            this.#boolIsAlarmPlusBtnPressed = false;
            this.#localCounter = 0; this.#incrementValue = 0, this.#intIndex = 0;
            this.#AlarmSetterObj.localStorageSaveAlarmTotalMinutes(this.#TOTAL_OF_MINUTES);
            this.#alarmTimeObj = this.#AlarmSetterObj.setNewAlarmObj(this.#alarmHour, this.#alarmMinute);
        }
    }

    #setRotation(element, rotationRatio) {

        element.style.setProperty(this.#handsRotationProperty, rotationRatio * 360);
    }

    #clearAlarmTimeDislay() {

        this.#displayAlarmMinute.textContent = "";

        this.#displayAlarmHour.textContent = "";
    }

    #setAlarmTimeDislay() {

        this.#displayAlarmMinute.textContent = ClockHelper.getSetNumberToTwoDigitsString(this.#alarmMinute);

        this.#displayAlarmHour.textContent = ClockHelper.getSetNumberToTwoDigitsString(this.#alarmHour);
    }

    // I am sorry for this naming 
    #executeOrder66(numberOfCiclesTillNextTarget) {

        this.currentPlusOrMinusFunction();

        this.#intIndex++;

        this.#incrementValue = this.#incrementValue + numberOfCiclesTillNextTarget;
    }

    setInit() {

        this.#boolIsClockRunning = true;

        this.TOTAL_OF_DEGREES = this.#TOTAL_OF_MINUTES * this.DEGREES_PER_ONE_MINUTE;

        this.#alarmHand.style.setProperty(this.#handsRotationProperty, this.TOTAL_OF_DEGREES);

        this.#setAlarmTimeDislay();

        if (this.#boolIsAlarmOn === true) {

            this.#analogAlarmOnOffBtn.classList.remove("analog-clock-two-off-position");
        }
        else {

            this.#analogAlarmOnOffBtn.classList.add("analog-clock-two-off-position");
        }
    }

    get getAlarmSetterPlusBtn() { return this.#AlarmSetterObj.getAlarmSetterPlusBtn; };
    get getAlarmSetterMinusBtn() { return this.#AlarmSetterObj.getAlarmSetterMinusBtn; };
    get getIsInterruptRequest() { return this.#boolIsInterruptRequest; };
    get getIsClockRunning() { return this.#boolIsClockRunning; };
    get getAlarmOnOffBtn() { return this.#analogAlarmOnOffBtn; };    
}

const AnalogClockTwoObj = new AnalogClockTwo(ClockOneAlarmSetterObj, ClockTwoAlarmAudioObj);

export default AnalogClockTwoObj;
