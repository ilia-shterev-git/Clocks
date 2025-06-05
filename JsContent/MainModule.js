

import dgClockOneDotsCheckBoxListener from './DOMListenersJs/dgClockOneDotsCheckBoxListener.js';

import dgClockOne_12_24_RblListener from './DOMListenersJs/dgClockOne_12_24_RblListener.js';

import dgClockOneAlarmOnOffRblListener from './DOMListenersJs/dgClockOneAlarmOnOffRblListener.js';

import dgClockOneAlarmSetterRangeListener from './DOMListenersJs/dgClockOneAlarmSetterRangeListener.js';

import dgClockOneAlarmSetterSetBtnListener from './DOMListenersJs/dgClockOneAlarmSetterSetBtnListener.js';

import dgClockOneAlarmSetterPlusBtnListener from './DOMListenersJs/dgClockOneAlarmSetterPlusBtnListener.js';
import dgClockOneAlarmSetterMinusBtnListener from './DOMListenersJs/dgClockOneAlarmSetterMinusBtnListener.js';

import dgClockOneAlarmSnoozeBtnListener from './DOMListenersJs/dgClockOneAlarmSnoozeBtnListener.js';

import anClockTwoAlarmSetterPlusBtnListener from './DOMListenersJs/anClockTwoAlarmSetterPlusBtnListener.js';
import anClockTwoAlarmSetterMinusBtnListener from './DOMListenersJs/anClockTwoAlarmSetterMinusBtnListener.js';

import anClockTwoAlarmOnOffBtnListener from './DOMListenersJs/anClockTwoAlarmOnOffBtnListener.js';

import StartStopClocksBtnListener from './DOMListenersJs/StartStopClocksBtnListener.js';
import DigitalClockOneObj from './ObjectsJs/DigitalClockOneObj.js';
import AnalogClockTwoObj from './ObjectsJs/AnalogClockTwoObj.js';

import DarkModeProcessor from './ObjectsJs/DarkModeObj.js';

import DmMouseMoveAndScrollListenerObj from './DOMListenersJs/DmMouseMoveAndScrollListener.js';

import dmRegularTorchOnOffBtnListener from './DOMListenersJs/dmRegularTorchOnOffBtnListener.js';

import dmLightOnOffBtnListener from './DOMListenersJs/dmLightOnOffBtnListener.js';

import dmXrayTorchOnOffBtnListener from './DOMListenersJs/dmXrayTorchOnOffBtnListener.js';

import dmSpyNoteHoverListener from './DOMListenersJs/dmSpyNoteHoverListener.js';

import dmAnimationEndListener from './DOMListenersJs/dmAnimationEndListener.js';

import DrdLanguagesCreatorObj from './ObjectsJs/DrdLanguagesCreatorObj.js';

import LnLanguagesDrdListener from './DOMListenersJs/LnLanguagesDrdListener.js';

(async function () {

    const StartStopClocksBtnListenerObj = new StartStopClocksBtnListener(DigitalClockOneObj, AnalogClockTwoObj);

    dgClockOne_12_24_RblListener(DigitalClockOneObj);

    dgClockOneAlarmOnOffRblListener(DigitalClockOneObj);

    dgClockOneAlarmSetterRangeListener(DigitalClockOneObj);

    dgClockOneDotsCheckBoxListener(DigitalClockOneObj);

    dgClockOneAlarmSetterSetBtnListener(DigitalClockOneObj);

    dgClockOneAlarmSetterPlusBtnListener(DigitalClockOneObj);

    dgClockOneAlarmSetterMinusBtnListener(DigitalClockOneObj);

    dgClockOneAlarmSnoozeBtnListener(DigitalClockOneObj);

    anClockTwoAlarmSetterPlusBtnListener(AnalogClockTwoObj);

    anClockTwoAlarmSetterMinusBtnListener(AnalogClockTwoObj);

    anClockTwoAlarmOnOffBtnListener(AnalogClockTwoObj);

    //DrdLanguagesCreatorObj;

    // The ONLY porpose of having AnalogClockTwoObj inside DarkModeObj is to
    // chenge second's color when light is On or Off
    const DarkModeObj = new DarkModeProcessor(DmMouseMoveAndScrollListenerObj
        , AnalogClockTwoObj);

    //---------------------------------------
    const LnLanguagesDrdListenerObj = new LnLanguagesDrdListener(DrdLanguagesCreatorObj);

    LnLanguagesDrdListenerObj.addObserver(StartStopClocksBtnListenerObj);

    LnLanguagesDrdListenerObj.addObserver(DarkModeObj);
    //---------------------------------------

    dmRegularTorchOnOffBtnListener(DarkModeObj);

    dmLightOnOffBtnListener(DarkModeObj);

    dmXrayTorchOnOffBtnListener(DarkModeObj);

    dmSpyNoteHoverListener(DarkModeObj);

    dmAnimationEndListener(DarkModeObj);
}());