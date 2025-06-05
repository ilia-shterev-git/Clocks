


import genericListener from './genericListener.js';

import START_CLOCKS_BTN_PHRASES_ENUM from "../LanguagesManager/LangPhrasesEnums/StartClocksBtnEnum.js";

import LanguageDetectorObj from "../LanguagesManager/LanguageDetector.js";

export default function StartStopClocksBtnListener(DigitalClockOneArg, AnalogClockTwoArg) {

    "use strict";

    /* NO public vars */

    let intervalID = null
        , boolIsFirstTimeClick = true
        , btnStartStopClocks = document.getElementById("btnStartStopClocks")
        , currentDateTime = null
        , boolStartStopClocks = false
        , globalCounter = -1
        , INTERVAL_CLOCK_TIME = 10
        , DigitalClockOneObj = DigitalClockOneArg
        , AnalogClockTwoObj = AnalogClockTwoArg
        , currentLanguagePhrases;

    currentLanguagePhrases = START_CLOCKS_BTN_PHRASES_ENUM[LanguageDetectorObj.getCurrentLanguage];

    btnStartStopClocks.textContent = currentLanguagePhrases.BtnClocks_Start;

    this.updateCurrentLanguage = function (newLanguageOption) {

        currentLanguagePhrases = START_CLOCKS_BTN_PHRASES_ENUM[newLanguageOption];

        if (boolStartStopClocks === false)

            btnStartStopClocks.textContent = currentLanguagePhrases.BtnClocks_Start;
        
        else

            btnStartStopClocks.textContent = currentLanguagePhrases.BtnClocks_Stop;       
    }

    const setMainFunctionality = (function () {

        currentDateTime = new Date();
        globalCounter++;

        //=========================  Version 2  NEVER MIND ========================
        // I used to have two versions of this code but as newer version got more complicated
        // so this is no longer the case

        // VERSION 2 is different of how the control flow of AlarmTimeToBeDisplaied is handled
        // Uncomment the lines bellow. 
        // Also down bellow are two more lines. One of them is to be uncommented and the other
        // is to be deleted or commented out. Instructions are given in the comments.

        // Other lines to be deleted or commented out are in the rightDotsSwitchON() and
        // processAndDisplay(currentTime) methods. Instructions are given in the comments.

        //if (globalCounter % 100 === 0)

        //    AnalogClockTwoObj.processAndDisplay(currentDateTime);

        //======================== END Version 2  ========================
        // ------------------------------------------------------------
        //=========================  alarmSettingsMainProcessAndDisplay  ========================

        if (DigitalClockOneObj.getIsInterruptRequest) {

            DigitalClockOneObj.alarmSettingsMainProcessAndDisplay();
            //return;  // UNCOMMENT that line if Version 2 is used. Look above.
        }

        if (AnalogClockTwoObj.getIsInterruptRequest) {

            AnalogClockTwoObj.alarmSettingsMainProcessAndDisplay();
        }
        //=========================  END alarmSettingsMainProcessAndDisplay  ========================

        if (globalCounter % 100 === 0) {

            DigitalClockOneObj.clocksMainProcessAndDisplay(currentDateTime);

            // DELETE or comment out that line if Version 2 is used. Look above.
            AnalogClockTwoObj.clocksMainProcessAndDisplay(currentDateTime);

            DigitalClockOneObj.rightDotsSwitchON();
        }
        else if ((DigitalClockOneObj.getIsRightDotsBlinking)
            && (globalCounter % 50 === 0)
            && (globalCounter % 100 !== 0)) {

            DigitalClockOneObj.rightsDotsSwitchOFF();
        }

        // Resetting the counter so it would not go too far increasing and exceeding the INT limit
        // The number is randomly chosen. Not too big.
        if (globalCounter === 1000000) globalCounter = 0;
    }).bind(this)

    let cbStartStopClocks = (function () {

        if (boolIsFirstTimeClick === true) {

            DigitalClockOneObj.setInit();
            AnalogClockTwoObj.setInit();
            boolIsFirstTimeClick = false;
        }

        if (boolStartStopClocks === false) {

            intervalID = setInterval(setMainFunctionality, INTERVAL_CLOCK_TIME);

            boolStartStopClocks = true;

            btnStartStopClocks.textContent = currentLanguagePhrases.BtnClocks_Stop;

        }
        else if (boolStartStopClocks === true) {

            clearInterval(intervalID);

            boolStartStopClocks = false;

            btnStartStopClocks.textContent = currentLanguagePhrases.BtnClocks_Start;
        }
    }).bind(this);

    genericListener("click", cbStartStopClocks, btnStartStopClocks);
}


