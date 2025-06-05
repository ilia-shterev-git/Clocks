

export default function dgClocksOneAlarmOnOffRblListener(DgClockOneObj) {

    const digitalAlarmOnOffSwitch = DgClockOneObj.getDigitalAlarmOnOffSwitch;

    function callBackForListener(event) {

        if (DgClockOneObj.getIsClockRunning === false)
            return;

        DgClockOneObj.cbOnAlarmOnOffSwitch(event.target.id);
    }

    function callBackOnTransitionEnd(event) {

        if (DgClockOneObj.getIsClockRunning === false)
            return;

        if (event.propertyName === "left")

            DgClockOneObj.cbOnAlarmOnOffSwitch_TransitionEnd_SetIndicators_BlinkingTimeDisplay();
    }

    digitalAlarmOnOffSwitch.addEventListener("change", callBackForListener);
    digitalAlarmOnOffSwitch.addEventListener("transitionend", callBackOnTransitionEnd);
}