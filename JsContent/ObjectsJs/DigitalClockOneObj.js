
//import ClockHelper from "../Utiljs/ClockHelper.js";


import ALARM_SETTINGS_ENUM from "../Utiljs/alarmsettingsenum.js";

import RANGE_SLIDER_ENUM from "../Utiljs/RangeSliderEnum.js";

import ALARM_AND_SNOOZE_TIME_ENUM from "../Utiljs/AlarmAndSnoozeTimeEnum.js";

import ClockOneDigitsObj from "../PrimalObjectsJs/ClockOneDigitsObj.js";

import ClockOne_12_24_Obj from "../PrimalObjectsJs/ClockOne_12_24_Obj.js";

import ClockOneDotsColsObj from "../PrimalObjectsJs/ClockOneDotsColsObj.js";

import ClockOneAlarmOnOffObj from "../PrimalObjectsJs/ClockOneAlarmOnOffObj.js";

import ClockOneAlarmSetterObj from "../PrimalObjectsJs/ClockOneAlarmSetterObj.js";

import ClockOneAlarmAudioObj from "../PrimalObjectsJs/ClockOneAlarmAudioObj.js";


class DigitalClockOne {

    "use strict";

    #DigitsObj;
    #Clock_12_24_Obj;
    #AlarmOnOffObj;
    #AlarmSetterObj
    #DotsColsObj; #ClockOneAlarmAudioObj;

    #currentHour; #currentMinute; #currentSecond; #tempCurrentHour;

    #localCounter; #incrementValue; #intIndex;

    #oldHour = -1; #oldMinute = -1;

    #alarmHour; #alarmMinute; #boolIsAlarmOn; #boolIsSnoozeOn;
    #alarmSetIntIndex; #alarmSetStrNewIndex; #alarmSetStrOldIndex; #tempAlarmSetIntIndex;

    #boolIsInterruptRequest; #boolIsAlarmSettingsInProgress; #intAlarmSettings; #boolIsAllDigitsAndDotsForInactive

    #isRightDotsBlinking = true;
    #isUsing_12_Display = true;

    /*#alarmTimeObj;*/

    #boolIsClockRunning; #boolIsAlarmMinusBtnPressed; #boolIsAlarmPlusBtnPressed;
    #currentPlusOrMinusFunction; #boolIsHourOrMinuteForDisplay;

    #ALARM_FIRST_DISPLAY_PERIOD; #ALARM_DISPLAY_PERIODS; #NUMBER_OF_DISPLAY_CYCLES;
    #NUMBER_OF_PAUSE_RING_CYCLES; #NUMBER_OF_DIGITS_TO_DIPLAY_ON_LOW_SPEED;

    #DIGIT_DISPLAY_PERIOD_AROUND_30; #DIGIT_DISPLAY_PERIOD_AROUND_20;
    #DIGIT_DISPLAY_PERIOD_AROUND_16; #DIGIT_DISPLAY_PERIOD_AROUND_15;
    #DIGIT_DISPLAY_PERIOD_AROUND_10;

    #NUMBER_OF_DIGITS_TO_DIPLAY_ON_HIGHER_SPEED;

    #ALARM_OBJ_MAIN_PROP; #boolIsAlarmOrSnoozeTime; #alarmTimeObj; #alarmMinuteObj; #alarmHourObj;

    #snoozeTimeObj; #boolIsAlarmTimeToBlinkAtStart;

    #setInactiveClass = "set-inactive";

    #alarmMark = document.getElementById('alarmMark');

    constructor(ClockOneDigitsArgs
        , ClockOne_12_24_Args
        , ClockOneAlarmOnOffArgs
        , ClockOneAlarmSetterArgs
        , ClockOneDotsColsArgs
        , ClockOneAlarmAudioArgs
    ) {

        this.#DigitsObj = ClockOneDigitsArgs;
        this.#Clock_12_24_Obj = ClockOne_12_24_Args;
        this.#AlarmOnOffObj = ClockOneAlarmOnOffArgs;
        this.#AlarmSetterObj = ClockOneAlarmSetterArgs
        this.#DotsColsObj = ClockOneDotsColsArgs;
        this.#ClockOneAlarmAudioObj = ClockOneAlarmAudioArgs

        this.#alarmHour = 0; this.#alarmMinute = 0;

        this.#alarmSetIntIndex = 0; this.#alarmSetStrNewIndex = "0"; this.#alarmSetStrOldIndex = "0";
        this.#tempAlarmSetIntIndex = 0;

        this.#boolIsInterruptRequest = false; this.#boolIsAlarmSettingsInProgress = false;

        this.#intAlarmSettings = ALARM_SETTINGS_ENUM.AllZero;

        this.#boolIsAlarmOn = this.#AlarmOnOffObj.getAlarmOnOffStatus;

        this.#boolIsSnoozeOn = false;

        const NUMBER_OF_DIGITS_TO_DIPLAY_ON_LOW_SPEED = 3;
        this.#NUMBER_OF_DIGITS_TO_DIPLAY_ON_LOW_SPEED = NUMBER_OF_DIGITS_TO_DIPLAY_ON_LOW_SPEED;

        const NUMBER_OF_DIGITS_TO_DIPLAY_ON_HIGHER_SPEED = 6;
        this.#NUMBER_OF_DIGITS_TO_DIPLAY_ON_HIGHER_SPEED = NUMBER_OF_DIGITS_TO_DIPLAY_ON_HIGHER_SPEED;

        const DIGIT_DISPLAY_PERIOD_AROUND_30 = 30;
        this.#DIGIT_DISPLAY_PERIOD_AROUND_30 = DIGIT_DISPLAY_PERIOD_AROUND_30;

        const DIGIT_DISPLAY_PERIOD_AROUND_20 = 20;
        this.#DIGIT_DISPLAY_PERIOD_AROUND_20 = DIGIT_DISPLAY_PERIOD_AROUND_20;

        const DIGIT_DISPLAY_PERIOD_AROUND_16 = 16;
        this.#DIGIT_DISPLAY_PERIOD_AROUND_16 = DIGIT_DISPLAY_PERIOD_AROUND_16;

        const DIGIT_DISPLAY_PERIOD_AROUND_15 = 15;
        this.#DIGIT_DISPLAY_PERIOD_AROUND_15 = DIGIT_DISPLAY_PERIOD_AROUND_15;

        const DIGIT_DISPLAY_PERIOD_AROUND_10 = 10;
        this.#DIGIT_DISPLAY_PERIOD_AROUND_10 = DIGIT_DISPLAY_PERIOD_AROUND_10;

        const ALARM_FIRST_DISPLAY_PERIOD = 40;
        this.#ALARM_FIRST_DISPLAY_PERIOD = ALARM_FIRST_DISPLAY_PERIOD;

        const ALARM_DISPLAY_PERIODS = 72;
        this.#ALARM_DISPLAY_PERIODS = ALARM_DISPLAY_PERIODS;

        const NUMBER_OF_DISPLAY_CYCLES = 5;
        this.#NUMBER_OF_DISPLAY_CYCLES = NUMBER_OF_DISPLAY_CYCLES;

        const ALARM_OBJ_MAIN_PROP = this.#AlarmSetterObj.getAlarmObjMainProp;
        this.#ALARM_OBJ_MAIN_PROP = ALARM_OBJ_MAIN_PROP;

        this.#boolIsClockRunning = false;

        this.#localCounter = 0; this.#incrementValue = 0, this.#intIndex = 0;

        this.#boolIsAlarmPlusBtnPressed = false; this.#boolIsAlarmMinusBtnPressed = false;

        this.#boolIsHourOrMinuteForDisplay = true;

        this.#boolIsAlarmOrSnoozeTime = false;

        // -----------------------------
        // This flag var was added in order to counter the initial blinking 
        // of the alarm time at clock's start if alarm set is ON
        // But hard coding it this way has some inaccuracies.
        // So #setAlarmBlinkingAtStart() was added for better accuracy

        // this.#boolIsAlarmTimeToBlinkAtStart = true;

        this.#setAlarmBlinkingAtStart();
        // -----------------------------

        this.#getSetAlarmHourAndMinuteFromLocalStorage();

        this.#alarmTimeObj = this.#AlarmSetterObj.setNewAlarmObjFromLocalStorage(this.#alarmHour, this.#alarmMinute);

        this.#boolIsAllDigitsAndDotsForInactive = true;
    }

    clocksMainProcessAndDisplay(currentTime) {

        this.#currentHour = currentTime.getHours();
        this.#currentMinute = currentTime.getMinutes();
        this.#currentSecond = currentTime.getSeconds();

        // If the digital clock is on AlarmTimeToBeDisplaied mode do not process the clocks's digits further.
        if (this.#boolIsInterruptRequest === false) {
       
            this.#DigitsObj.setDigitsPair(this.#currentSecond,
                this.#DigitsObj.DIGITS_PAIRS_ENUM.SECONDS);
        }

        if (this.#currentMinute !== this.#oldMinute) {

            this.#oldMinute = this.#currentMinute;

            if (this.#boolIsAlarmOn === true) {
 
                if (this.#boolIsSnoozeOn === true) {

                    this.#checkForSnoozeTime_SignalAlarm();
                }
                else {

                    this.#checkForAlarmTime_SignalAlarm();
                }
            }

        // If the digital clock is on AlarmTimeToBeDisplaied mode do not process the clocks digits further.
            if (this.#boolIsInterruptRequest === false)

            this.#DigitsObj.setDigitsPair(this.#currentMinute,
                this.#DigitsObj.DIGITS_PAIRS_ENUM.MINUTES);
        }

        if (this.#currentHour !== this.#oldHour) {

            this.#oldHour = this.#currentHour;

        // If the digital clock is on AlarmTimeToBeDisplaied do not process the clocks digits further.
            if (this.#boolIsInterruptRequest === false) {

                this.#Clock_12_24_Obj.set_AM_PM_Indicators(this.#currentHour);
                this.#tempCurrentHour = this.#Clock_12_24_Obj.set_24_Or_AM_PM_Hour(this.#currentHour);

                this.#DigitsObj.setDigitsPair(this.#tempCurrentHour,
                    this.#DigitsObj.DIGITS_PAIRS_ENUM.HOURS);
            }``
        }
    }

    #checkForSnoozeTime_SignalAlarm() {

        if ((this.#snoozeTimeObj[this.#ALARM_OBJ_MAIN_PROP].hasOwnProperty(this.#currentMinute.toString()))
            && (this.#snoozeTimeObj[this.#ALARM_OBJ_MAIN_PROP][this.#currentMinute.toString()].hasOwnProperty(this.#currentHour.toString()))) {

            let localIndex = this.#snoozeTimeObj[this.#ALARM_OBJ_MAIN_PROP][this.#currentMinute.toString()][this.#currentHour.toString()];

            if (localIndex === ALARM_AND_SNOOZE_TIME_ENUM.StartAll) {

                this.#boolIsAlarmOrSnoozeTime = true;
                this.#ClockOneAlarmAudioObj.playAlarmSound();
            }
            else if (localIndex === ALARM_AND_SNOOZE_TIME_ENUM.PauseAlarm) {

                this.#ClockOneAlarmAudioObj.pauseAlarmSound();
            }
            else if (localIndex === ALARM_AND_SNOOZE_TIME_ENUM.StartAlarm) {

                this.#ClockOneAlarmAudioObj.playAlarmSound();
            }
            else if (localIndex === ALARM_AND_SNOOZE_TIME_ENUM.EndAll) {

                this.#boolIsSnoozeOn = false;
                this.#boolIsAlarmOrSnoozeTime = false;
                this.#ClockOneAlarmAudioObj.stopAlarmSound();
                this.#AlarmSetterObj.setSnoozeBtnInactiveColors();
                this.#AlarmSetterObj.disposeOfSnoozeObj();
            }
        }
    }

    #checkForAlarmTime_SignalAlarm() {

        if ((this.#alarmTimeObj[this.#ALARM_OBJ_MAIN_PROP].hasOwnProperty(this.#currentMinute.toString()))
            && (this.#alarmTimeObj[this.#ALARM_OBJ_MAIN_PROP][this.#currentMinute.toString()].hasOwnProperty(this.#currentHour.toString()))) {

            let localIndex = this.#alarmTimeObj[this.#ALARM_OBJ_MAIN_PROP][this.#currentMinute.toString()][this.#currentHour.toString()];

            if (localIndex === ALARM_AND_SNOOZE_TIME_ENUM.StartAll) {

                this.#AlarmSetterObj.setSnoozeBtnHintingColors();

                this.#boolIsAlarmOrSnoozeTime = true;
                this.#ClockOneAlarmAudioObj.playAlarmSound();
            }
            else if (localIndex === ALARM_AND_SNOOZE_TIME_ENUM.PauseAlarm) {

                this.#ClockOneAlarmAudioObj.pauseAlarmSound();
            }
            else if (localIndex === ALARM_AND_SNOOZE_TIME_ENUM.StartAlarm) {

                this.#ClockOneAlarmAudioObj.playAlarmSound();
            }
            else if (localIndex === ALARM_AND_SNOOZE_TIME_ENUM.EndAll) {

                this.#boolIsAlarmOrSnoozeTime = false;
                this.#ClockOneAlarmAudioObj.stopAlarmSound();
                this.#AlarmSetterObj.setSnoozeBtnInactiveColors();
            }
        }
    }

    cbOnAlarmSnoozeBtn() {

        if (this.#boolIsAlarmOrSnoozeTime === false)
            return;

        this.#snoozeTimeObj = this.#AlarmSetterObj.setSnoozeObj();

        this.#ClockOneAlarmAudioObj.pauseAlarmSound();

        this.#boolIsSnoozeOn = true;
        this.#boolIsAlarmOrSnoozeTime = false;

        this.#AlarmSetterObj.setSnoozeBtnActiveColors();
    }

    //  #region Alarm Setter  ==========================================================================

    cbOnAlarmSetterSetBtn() {

    // #alarmSetIntIndex represents which alarm setting selection was chosen
    // 0 is TIME, means it will blink the selected alarm time and return to the regular time display
    // 1 is HR, it will show the alarm hour and it can be chaged through the + or - buttons
    // 2 is MIN, it will show the alarm minute and it can be chaged through the + or - buttons
    // 3 is TIME again same as above.
    // IN THIS CASE alarmSetIntIndex is being changed through the SET button,
    // i.e.  alarmSetterRangeSlider.
    // #alarmSetIntIndex is increased sequentially to 3 and back to zero
        this.#setCurrentIntIndex_SetNewStringIndex_SetBtnVersion();

        this.#processAlarmSettings();
    }

    // #alarmSetIntIndex represents which alarm setting selection was chosen
    // 0 is TIME, means it will blink the selected alarm time and return to the regular time display
    // 1 is HR, it will show the alarm hour and it can be chaged through the + or - buttons
    // 2 is MIN, it will show the alarm minute and it can be chaged through the + or - buttons
    // 3 is TIME again same as 0 above.
    // IN THIS CASE alarmSetIntIndex is being changed through the SET button,
    // i.e.  alarmSettterSetBtn .
    // #alarmSetIntIndex is increased sequentially to 3 and back to zero
    #setCurrentIntIndex_SetNewStringIndex_SetBtnVersion() {

        if (this.#alarmSetIntIndex === RANGE_SLIDER_ENUM.AlarmTimeRightPosition)

            this.#alarmSetIntIndex = RANGE_SLIDER_ENUM.AlarmTimeLeftPosition;

        else
            this.#alarmSetIntIndex++;


        this.#alarmSetStrNewIndex = this.#alarmSetIntIndex.toString();
    }

    cbSetAlarmOnRangeSliderListener(strRangeValue) {

    // #alarmSetIntIndex represents which alarm setting selection was chosen
    // 0 is TIME, means it will blink the selected alarm time and return to the regular time display
    // 1 is HR, it will show the alarm hour and it can be chaged through the + or - buttons
    // 2 is MIN, it will show the alarm minute and it can be chaged through the + or - buttons
    // 3 is TIME again same as 0 above.
    // IN THIS CASE alarmSetIntIndex is being changed through the range slider,
    // i.e alarmSetterRangeSlider .
        this.#setCurrentIntIndex_SetNewStringIndex_RangeVersion(strRangeValue)

        this.#processAlarmSettings();
    }

    // alarmSetIntIndex represents which alarm setting selection was chosen
    // 0 is TIME, means it will blink the selected alarm time and return to the regular time display
    // 1 is HR, it will show the alarm hour and it can be chaged through the + or - buttons
    // 2 is MIN, it will show the alarm minute and it can be chaged through the + or - buttons
    // 3 is TIME again same as 0 above.
    // IN THIS CASE alarmSetIntIndex is being changed through the range slider
    // i.e.  alarmSettterRangeSlider
    #setCurrentIntIndex_SetNewStringIndex_RangeVersion(strRangeValue) {

        this.#tempAlarmSetIntIndex = parseInt(strRangeValue);

        if (isNaN(this.#tempAlarmSetIntIndex) === false) {

            this.#alarmSetIntIndex = this.#tempAlarmSetIntIndex;
            this.#alarmSetStrNewIndex = strRangeValue;
        }
    }

    // Called either by the SET button or the range slider
    // Sets ON and OFF indicators TIME, HR, MIN accordingly
    // Sets flag variables which wil expose specific actions in the main flow - setInterval
    // Displays Alarm time, HOUR, or MINUTE for setting with the + or - buttons
    #processAlarmSettings() {

        // Sets ON and OFF indicators TIME, HR, MIN accordingly
        this.#AlarmSetterObj.setAlarmSettingIndicators(this.#alarmSetStrNewIndex, this.#alarmSetStrOldIndex);

        this.#alarmSetStrOldIndex = this.#alarmSetStrNewIndex;

        this.#boolIsInterruptRequest = true;

        this.#localCounter = 0; this.#incrementValue = 0, this.#intIndex = 0;

        // Sets flag variables which wil expose specific actions in the main flow - setInterval
        // Displays Alarm time, HOUR, or MINUTE for setting with the + or - buttons
        if ((this.#alarmSetIntIndex === RANGE_SLIDER_ENUM.AlarmTimeLeftPosition)
            || (this.#alarmSetIntIndex === RANGE_SLIDER_ENUM.AlarmTimeRightPosition)) {

            // If the alarm setting index gets to those values, that means the user has changed
            // alarm hour and or minute and the new alarm time and #alarmTimeObj has to be stored
            // in the local storage
            this.#AlarmSetterObj.localStorageSaveAlarmTimeObj(this.#alarmHour, this.#alarmMinute);

            this.#alarmTimeObj = this.#AlarmSetterObj
                .resetExistingAlarmObj(this.#alarmHour, this.#alarmMinute, this.#alarmTimeObj);

            this.#intAlarmSettings = ALARM_SETTINGS_ENUM.DisplayAlarmTime;
        }
        else if (this.#alarmSetIntIndex === RANGE_SLIDER_ENUM.AlarmHour) {

            this.#boolIsHourOrMinuteForDisplay = true;
            this.#boolIsAllDigitsAndDotsForInactive = true;
            this.#boolIsAlarmSettingsInProgress = true;
            this.#intAlarmSettings = ALARM_SETTINGS_ENUM.DisplayAlarmHour;
        }
        else if (this.#alarmSetIntIndex === RANGE_SLIDER_ENUM.AlarmMinute) {

            this.#boolIsHourOrMinuteForDisplay = true;
            this.#boolIsAllDigitsAndDotsForInactive = true;
            this.#boolIsAlarmSettingsInProgress = true;
            this.#intAlarmSettings = ALARM_SETTINGS_ENUM.DisplayAlarmMinute;
        }
    }


    // Responds to + button pressed and / or held
    // sets flag vars which cause inceasing either the hour or minutes
    // main action takes place in the alarmsMainProcessAndDisplay() methid
    // respectively #displayBlinkingAlarmTime_DisplayStaticAlarmHoursMins_SetAlarmHoursMins()
    cbOnAlarmSetterPlusBtn(IsAlarmPlusBtnPressed) {

        if ((this.#boolIsInterruptRequest === false)
            || (this.#boolIsAlarmSettingsInProgress === false))

            return;

        this.#boolIsAlarmPlusBtnPressed = IsAlarmPlusBtnPressed;

        if (this.#boolIsAlarmPlusBtnPressed === true) {

            this.#localCounter = 0; this.#incrementValue = 0, this.#intIndex = 0;
        }
        else {

            this.#boolIsHourOrMinuteForDisplay = true;
        }
    }

    // Responds to - button pressed and / or held
    // sets flag vars which cause decreasing either the hour or minutes
    // main action takes place in the alarmsMainProcessAndDisplay() methid
    // respectively #displayBlinkingAlarmTime_DisplayStaticAlarmHoursMins_SetAlarmHoursMins()
    cbOnAlarmSetterMinusBtn(IsAlarmMinusBtnPressed) {

        if ((this.#boolIsInterruptRequest === false)
            || (this.#boolIsAlarmSettingsInProgress === false))

            return

        this.#boolIsAlarmMinusBtnPressed = IsAlarmMinusBtnPressed;

        if (this.#boolIsAlarmMinusBtnPressed === true) {

            this.#localCounter = 0; this.#incrementValue = 0, this.#intIndex = 0;
        }
        else {

            this.#boolIsHourOrMinuteForDisplay = true;
        }
    }

    // Second stage after + or - button is pressed and / or held
    // sets flag vars which cause decreasing either the hour or minutes
    // Main action takes place in the alarmsMainProcessAndDisplay() methid
    // respectively #displayBlinkingAlarmTime_DisplayStaticAlarmHoursMins_SetAlarmHoursMins()
    alarmSettingsMainProcessAndDisplay() {

        if (this.#intAlarmSettings === ALARM_SETTINGS_ENUM.DisplayAlarmTime) {

            this.#displayBlinkingAlarmTime();
        }
        else if ((this.#intAlarmSettings === ALARM_SETTINGS_ENUM.DisplayAlarmHour)
            || (this.#intAlarmSettings === ALARM_SETTINGS_ENUM.DisplayAlarmMinute)) {

            this.#displayStaticAlarmHoursMins_SetAlarmHoursMins();
        }
    }

    // Third stage after + or - button is pressed and / or held
    // sets flag vars which cause decreasing either the hour or minutes
    // Main action takes place in the alarmsMainProcessAndDisplay() methid
    // respectively here
    #displayStaticAlarmHoursMins_SetAlarmHoursMins() {

        if (this.#boolIsAllDigitsAndDotsForInactive === true) {

            this.#boolIsAllDigitsAndDotsForInactive = false;
            this.#setAllDigitsAndDotsInactive();
        }

        if (this.#intAlarmSettings === ALARM_SETTINGS_ENUM.DisplayAlarmHour) {

            if (this.#boolIsHourOrMinuteForDisplay === true) {

                this.#showCurrentAlarmHour();
                this.#boolIsHourOrMinuteForDisplay = false;
            }

            if (this.#boolIsAlarmPlusBtnPressed === true) {

                this.#currentPlusOrMinusFunction = () => {
                    this.#alarmHour = this.#alarmHour + 1
                    if (this.#alarmHour === 24)
                        this.#alarmHour = 0;

                    this.#showCurrentAlarmHour();
                };

                /* this.#localCounter = 0; this.#incrementValue = 0, this.#intIndex = 0;*/
                if (this.#localCounter === this.#incrementValue) {

                    if (this.#intIndex < this.#NUMBER_OF_DIGITS_TO_DIPLAY_ON_LOW_SPEED) {

                        this.#executeOrder66(this.#DIGIT_DISPLAY_PERIOD_AROUND_30);
                    }
                    else if (this.#intIndex < this.#NUMBER_OF_DIGITS_TO_DIPLAY_ON_HIGHER_SPEED) {

                        this.#executeOrder66(this.#DIGIT_DISPLAY_PERIOD_AROUND_20);
                    }
                    else {

                        this.#executeOrder66(this.#DIGIT_DISPLAY_PERIOD_AROUND_15);
                    }
                }
            }
            else if (this.#boolIsAlarmMinusBtnPressed === true) {

                this.#currentPlusOrMinusFunction = () => {
                    this.#alarmHour = this.#alarmHour - 1
                    if (this.#alarmHour === -1)
                        this.#alarmHour = 23;

                    this.#showCurrentAlarmHour();
                };

                if (this.#localCounter === this.#incrementValue) {

                    if (this.#intIndex < this.#NUMBER_OF_DIGITS_TO_DIPLAY_ON_LOW_SPEED) {

                        this.#executeOrder66(this.#DIGIT_DISPLAY_PERIOD_AROUND_30);
                    }
                    else if (this.#intIndex < this.#NUMBER_OF_DIGITS_TO_DIPLAY_ON_HIGHER_SPEED) {

                        this.#executeOrder66(this.#DIGIT_DISPLAY_PERIOD_AROUND_20);
                    }
                    else {

                        this.#executeOrder66(this.#DIGIT_DISPLAY_PERIOD_AROUND_15);
                    }
                }
            }
        }
        else if (this.#intAlarmSettings === ALARM_SETTINGS_ENUM.DisplayAlarmMinute) {

            if (this.#boolIsHourOrMinuteForDisplay === true) {

                this.#showCurrentAlarmMinute();
                this.#boolIsHourOrMinuteForDisplay = false;
            }

            if (this.#boolIsAlarmPlusBtnPressed === true) {

                this.#currentPlusOrMinusFunction = () => {
                    this.#alarmMinute = this.#alarmMinute + 1
                    if (this.#alarmMinute === 61)
                        this.#alarmMinute = 0;

                    this.#showCurrentAlarmMinute();
                };

                if (this.#localCounter === this.#incrementValue) {

                    if (this.#intIndex < this.#NUMBER_OF_DIGITS_TO_DIPLAY_ON_LOW_SPEED) {

                        this.#executeOrder66(this.#DIGIT_DISPLAY_PERIOD_AROUND_30);
                    }
                    else if (this.#intIndex < this.#NUMBER_OF_DIGITS_TO_DIPLAY_ON_HIGHER_SPEED) {

                        this.#executeOrder66(this.#DIGIT_DISPLAY_PERIOD_AROUND_16);
                    }
                    else {

                        this.#executeOrder66(this.#DIGIT_DISPLAY_PERIOD_AROUND_10);
                    }
                }
            }
            else if (this.#boolIsAlarmMinusBtnPressed === true) {

                this.#currentPlusOrMinusFunction = () => {
                    this.#alarmMinute = this.#alarmMinute - 1
                    if (this.#alarmMinute === -1)
                        this.#alarmMinute = 60;

                    this.#showCurrentAlarmMinute();
                };

                if (this.#localCounter === this.#incrementValue) {

                    if (this.#intIndex < this.#NUMBER_OF_DIGITS_TO_DIPLAY_ON_LOW_SPEED) {

                        this.#executeOrder66(this.#DIGIT_DISPLAY_PERIOD_AROUND_30);
                    }
                    else if (this.#intIndex < this.#NUMBER_OF_DIGITS_TO_DIPLAY_ON_HIGHER_SPEED) {

                        this.#executeOrder66(this.#DIGIT_DISPLAY_PERIOD_AROUND_16);
                    }
                    else {

                        this.#executeOrder66(this.#DIGIT_DISPLAY_PERIOD_AROUND_10);
                    }
                }
            }
        }

        this.#localCounter++;
    }

    #executeOrder66(numberOfCiclesTillNextTarget) {

        this.#currentPlusOrMinusFunction();

        this.#intIndex++;

        this.#incrementValue = this.#incrementValue + numberOfCiclesTillNextTarget;
    }

    // It is called when alarm set takes place and HR is selected
    #showCurrentAlarmHour() {

        this.#Clock_12_24_Obj.set_AM_PM_Indicators(this.#alarmHour);
        this.#tempCurrentHour = this.#Clock_12_24_Obj.set_24_Or_AM_PM_Hour(this.#alarmHour);

        this.#DigitsObj.setDigitsPair(this.#tempCurrentHour,
            this.#DigitsObj.DIGITS_PAIRS_ENUM.HOURS);
    }

    // It is called when alarm set takes place and MIN is selected
    #showCurrentAlarmMinute() {

        this.#DigitsObj.setDigitsPair(this.#alarmMinute,
            this.#DigitsObj.DIGITS_PAIRS_ENUM.MINUTES);
    }

    //  #endregion Alarm Setter  =======================================================================

    // #region Alarm ON / OFF Switch

    // called in the event listener when a selection is made for alarm ON
    // the radio button ID comes as a radioButtonTargetId.
    // This however is only half of the action during the RBL switches. There is a transitionend
    // event which takes place later but works together with this event.
    cbOnAlarmOnOffSwitch(radioButtonTargetId) {

        this.#localCounter = 0; this.#incrementValue = 0, this.#intIndex = 0;

        // I still keep that var although it is parallel to the one in AlarmObj.
        // I still need to rethink how important it is. In general I am thinking to remove it       
        // and use the one in AlarmObj through a getter.
        this.#boolIsAlarmOn = this.#AlarmOnOffObj.checkTargetIdCheckAlarmOnOffStatus(radioButtonTargetId);
    }

    cbOnAlarmOnOffSwitch_TransitionEnd_SetIndicators_BlinkingTimeDisplay() {

        if (this.#boolIsAlarmOn === true) {

            this.#AlarmOnOffObj.setAlarmOnMarkActive();
            // This #boolIsAlarmTimeToBlinkAtStart for the case when Start Animation btn 
            // is clicked and the user has left the Alarm On before.
            // This alarm status has been stored in the local storage so when the switch gets to the On 
            // position automatically t treiggers immediately blinking alarm hour and minutes. 
            // This does not look very nice. You can observe the effect if you set 
            // #boolIsAlarmTimeToBlinkAtStart to false inside this class' constructor.
            //
            // The #boolIsAlarmTimeToBlinkAtStart is used only once in the life cicle of the app.
            //
            // Later #boolIsAlarmSettingsInProgress prevents again from blinking 
            // alarm hour and minutes when the user is trying to set the alarm hour 
            // or alarm minutes.Basically it isolates the alarm setting from the Alarm On switch
            if ((this.#boolIsAlarmSettingsInProgress === false)
                && (this.#boolIsAlarmTimeToBlinkAtStart === false)) {

                this.#boolIsInterruptRequest = true;
                this.#intAlarmSettings = ALARM_SETTINGS_ENUM.DisplayAlarmTime;
            }

            if (this.#boolIsAlarmTimeToBlinkAtStart === true) {

                // The #boolIsAlarmTimeToBlinkAtStart is used only once
                // in the life cicle of the app It is needed to prevent alarm time 
                // blinking at the start of the clock if clock's alarm is ON
                this.#boolIsAlarmTimeToBlinkAtStart = false;
            }
        }
        else {
            this.#AlarmOnOffObj.setAlarmOffMarkActive();

            // This is the case when Alarm On / Off button is switched to On and
            // while the alarm digits are blinking is switched back to Off.
            // In this case te display hangs in an incorrect position.
            // So here is the correction.
            if ((this.#boolIsInterruptRequest === true)
                && (this.#boolIsAlarmSettingsInProgress === false)) {

                this.#setBackCurrentTime();

                this.#boolIsInterruptRequest = false;
            }

            if (this.#boolIsAlarmSettingsInProgress === false) {

                this.#boolIsInterruptRequest = false;
                this.#intAlarmSettings = ALARM_SETTINGS_ENUM.AllZero;
            }

            this.#boolIsSnoozeOn = false;
            this.#boolIsAlarmOrSnoozeTime = false;
            this.#AlarmSetterObj.disposeOfSnoozeObj();
            this.#ClockOneAlarmAudioObj.stopAlarmSound();
            this.#AlarmSetterObj.setSnoozeBtnInactiveColors();
        }
    }

    // #endregion Alarm ON / OFF Switch

    //  #region Clocks 12 / 24 Setter  ==========================================================================

    // called in the event listener when a selection is made for 12 / 24 hour display
    // the radio button ID comes as a radioButtonTargetId. There is a transitionend
    // event - cbOn_12_24_Switch_TransitionEnd_Set_12_24_Indicators_SetHour()
    // which takes place later but works together with this event.
    cbOn_12_24_Switch(radioButtonTargetId) {

        // I still keep that var although it is parallel to the one in Clocks_12_24_Obj.
        // I still need to rethink how important it is. In general I am thinking to remove it       
        // and use the one in Clocks_12_24_Obj through a getter.
        this.#isUsing_12_Display = this.#Clock_12_24_Obj.checkTargetIdCheckIsUsing_12_Display(radioButtonTargetId);
    }

    // when user switches between AM PM or 24 time display and the indicators switch on or off
    // imidiately. This TransitionEnd event makes them switch at the end of it. 
    // Smoother and more realistic look. This transitionend event takes place after 
    // cbOnRBL_24_12_Set_12_24(radioButtonTargetId) and works together with it.
    cbOn_12_24_Switch_TransitionEnd_Set_12_24_Indicators_SetHour() {

        // if we are setting the alarm time and it is turn of the alarm hour
        // we want to display this alarm hour adequately, 
        // i.e.either AM / PM or military style
        if ((this.#boolIsInterruptRequest === true)
            && (this.#boolIsAlarmSettingsInProgress === true)
            && (this.#intAlarmSettings === ALARM_SETTINGS_ENUM.DisplayAlarmHour === true)) {

            this.#showCurrentAlarmHour();

            return;
        }

        // Switches both indicators off or one of them on.  #showCurrentAlarmHour()
        this.#Clock_12_24_Obj.set_AM_PM_Indicators(this.#currentHour);

        this.#tempCurrentHour = this.#Clock_12_24_Obj.set_24_Or_AM_PM_Hour(this.#currentHour);
        this.#DigitsObj.setDigitsPair(this.#tempCurrentHour, this.#DigitsObj.DIGITS_PAIRS_ENUM.HOURS);   
    }

    //  #endregion Clocks 12 / 24 Setter  ==========================================================================

    // Diplays the alarm hour and minutes. No seconds and the right 2 dots are off.
    // It called periodically so they blink. The whole chain of actions is called 
    // either when alarm is switched on through RBL's ON / OFF 
    // or when the alarm setter is returned back to TIME after HR or MIN set.
    showCurrentAlarmTime() {

        this.#DigitsObj.setDigitsPair(this.#alarmMinute,
            this.#DigitsObj.DIGITS_PAIRS_ENUM.MINUTES);

        this.#Clock_12_24_Obj.set_AM_PM_Indicators(this.#alarmHour);
        this.#tempCurrentHour = this.#Clock_12_24_Obj.set_24_Or_AM_PM_Hour(this.#alarmHour);

        this.#DigitsObj.setDigitsPair(this.#tempCurrentHour,
            this.#DigitsObj.DIGITS_PAIRS_ENUM.HOURS);
    }

    // It is called after blinking showCurrentAlarmTime() as a last step toward returning to dispaly
    // regular time. The whole chain of actions is called either when alarm is switched on throught RBL's
    // ON / OFF or when the alarm setter is returned back to TIME after HR or MIN set.
    #setBackCurrentTime() {

        this.#DigitsObj.setDigitsPair(this.#currentMinute,
            this.#DigitsObj.DIGITS_PAIRS_ENUM.MINUTES);

        this.#DigitsObj.setDigitsPair(this.#currentSecond,
            this.#DigitsObj.DIGITS_PAIRS_ENUM.SECONDS);

        this.#Clock_12_24_Obj.set_AM_PM_Indicators(this.#currentHour);
        this.#tempCurrentHour = this.#Clock_12_24_Obj.set_24_Or_AM_PM_Hour(this.#currentHour);

        this.#DigitsObj.setDigitsPair(this.#tempCurrentHour,
            this.#DigitsObj.DIGITS_PAIRS_ENUM.HOURS);

        // It switches them on regardles if they are binking or not.
        // After this function the control is given back to the main float - setInterval
        // and it will make them blink or keep the on.
        this.#DotsColsObj.rightDotsSwitchON();
    }

    #setAllDigitsAndDotsInactive() {

        this.#DigitsObj.setDigitsPairToDisabled(this.#DigitsObj.DIGITS_PAIRS_ENUM.SECONDS);

        this.#DigitsObj.setDigitsPairToDisabled(this.#DigitsObj.DIGITS_PAIRS_ENUM.MINUTES);

        this.#DigitsObj.setDigitsPairToDisabled(this.#DigitsObj.DIGITS_PAIRS_ENUM.HOURS);

        this.#Clock_12_24_Obj.switchAMPMIndicatorOFF();

        this.#DotsColsObj.rightsDotsSwitchOFF();
    }

    #displayBlinkingAlarmTime() {

        if (this.#localCounter === this.#incrementValue) {

            if (this.#intIndex === 0) {

                this.#setAllDigitsAndDotsInactive();

                this.#incrementValue = this.#ALARM_FIRST_DISPLAY_PERIOD;
                this.#intIndex++;
            }
            else {
                if (this.#intIndex % 2 === 1) {

                    if (this.#intIndex === this.#NUMBER_OF_DISPLAY_CYCLES) {

                        this.#setBackCurrentTime();

                        this.#boolIsInterruptRequest = false;
                        this.#boolIsAlarmSettingsInProgress = false;
                        this.#intAlarmSettings = ALARM_SETTINGS_ENUM.AllZero;
                        return;
                    }

                    this.showCurrentAlarmTime();
                }
                if (this.#intIndex % 2 === 0) {

                    this.#setAllDigitsAndDotsInactive();
                }

                this.#intIndex++;
                this.#incrementValue = this.#incrementValue + this.#ALARM_DISPLAY_PERIODS;
            }
        }

        this.#localCounter++;
    }

    // sets this.#isRightDotsBlinking which is in #DotsColsObj. 
    // This var plays role in the main flow - setInterval.
    // Gives the dots "initial push", i.e. sets them visible or not.
    cbOnDotsCheckBoxSwitch(boolValue) {

        if (typeof boolValue === 'boolean')

            // This var is currently considered for removal
            // as it has a parallel one in the #DotsColsObj
            this.#isRightDotsBlinking = boolValue;

        this.#DotsColsObj.setRightDotsBlinkingOrStatic_SetChoiceInLocalStorage(boolValue);
    }

    // called when StartStopAnimation button is clicked
    // Most of them I could call trough their constructors
    // but moving switches dynamically looks cooler.
    // However this.#boolIsClockRunning = true is set only here since
    // every button's listener is not working if the clock is not running.
    //     if (ClockObj.getIsClockRunning === false)   return;
    setInit() {

        this.#Clock_12_24_Obj.setInitForRadioButtonsSelection();
        this.#isRightDotsBlinking = this.#DotsColsObj.setInitForDotsColsAndCheckBox();
        this.#AlarmOnOffObj.setInitForRadioButtonsSelection();

        this.#alarmMark.classList.remove(this.#setInactiveClass);

        this.#AlarmSetterObj.setInitMainAndTimeIndicator();

        this.#boolIsClockRunning = true;
    }

    // Called in the main flow i.e. setInterval for half a second. But they will go OFF only
    // if DigitalClockOneObj.getIsRightDotsBlinking returs true
    //    if ((DigitalClockOneObj.getIsRightDotsBlinking) && (globalCounter % 50 === 0) && (globalCounter % 100 !== 0))
    //          DigitalClockOneObj.rightsDotsSwitchOFF();
    // Also takes place when alarm time is displaied or alarm set.
    rightsDotsSwitchOFF() {

        this.#DotsColsObj.rightsDotsSwitchOFF();
    }

    // Called in the main flow i.e. setInterval for half a second
    // if (globalCounter % 100 === 0) { ... DigitalClockOneObj.rightDotsSwitchON();
    rightDotsSwitchON() {

        // If the digital clock is on AlarmTimeToBeDisplaied mode it does return and
        // do not process the digital clock further.
        // DELETE or comment out that line if Version 2 is used. Look at setMainFunctionality() method.
        if (this.#boolIsInterruptRequest === true)
            return;
       
        this.#DotsColsObj.rightDotsSwitchON();
    }

    #setAlarmBlinkingAtStart() {

        if (this.#boolIsAlarmOn===true)

            this.#boolIsAlarmTimeToBlinkAtStart = true;
        else
            this.#boolIsAlarmTimeToBlinkAtStart = false;
    }

    #getSetAlarmHourAndMinuteFromLocalStorage() {

        let alarmTimeObj = this.#AlarmSetterObj.getAlarmTimeObj;
        this.#alarmHour = alarmTimeObj.alarmHour, this.#alarmMinute = alarmTimeObj.alarmMinute;
    }


    // This function displays blinking alarm Hour or alarm Minutes
    // But I observed that changing blinking digits is not praktical.
    // So it was replased
    #displayBlinkingAlarmSettings() {

        if (this.#localCounter === this.#incrementValue) {

            if (this.#intIndex === 0) {

                this.#setAllDigitsAndDotsInactive();

                this.#incrementValue = this.#ALARM_FIRST_DISPLAY_PERIOD;
                this.#intIndex++;
            }
            else {
                if (this.#intIndex % 2 === 1) {

                    if (this.#intAlarmSettings === ALARM_SETTINGS_ENUM.DisplayAlarmHour) {

                        this.#showCurrentAlarmHour();
                    }
                    else if (this.#intAlarmSettings === ALARM_SETTINGS_ENUM.DisplayAlarmMinute) {

                        this.#showCurrentAlarmMinute();
                    }

                }
                else if (this.#intIndex % 2 === 0) {

                    this.#setAllDigitsAndDotsInactive();
                }

                this.#intIndex++;
                this.#incrementValue = this.#incrementValue + this.#ALARM_DISPLAY_PERIODS;
            }
        }

        this.#localCounter++;
    }

    get getClocks_12_24_Switch() { return this.#Clock_12_24_Obj.getClocks_12_24_Switch; };
    get getDigitalAlarmOnOffSwitch() { return this.#AlarmOnOffObj.getDigitalAlarmOnOffSwitch; };
    get getDotsCheckBoxSwitch() { return this.#DotsColsObj.getDotsCheckBoxSwitch; };

    get getAlarmSetterRangeSlider() { return this.#AlarmSetterObj.getAlarmSetterRangeSlider; };
    get getAlarmSetterSetBtn() { return this.#AlarmSetterObj.getAlarmSetterSetBtn; };
    get getAlarmSetterPlusBtn() { return this.#AlarmSetterObj.getAlarmSetterPlusBtn; };
    get getAlarmSetterMinusBtn() { return this.#AlarmSetterObj.getAlarmSetterMinusBtn; };

    get getAlarmSnoozeBtn() { return this.#AlarmSetterObj.getDigitalAlarmSnoozeBtn; };

    get getIsRightDotsBlinking() { return this.#isRightDotsBlinking; };
    get getIsInterruptRequest() { return this.#boolIsInterruptRequest; };
    get getIsClockRunning() { return this.#boolIsClockRunning; };
}

const DigitalClockOneObj = new DigitalClockOne(
    ClockOneDigitsObj
    , ClockOne_12_24_Obj
    , ClockOneAlarmOnOffObj
    , ClockOneAlarmSetterObj
    , ClockOneDotsColsObj
    , ClockOneAlarmAudioObj
);

export default DigitalClockOneObj;


