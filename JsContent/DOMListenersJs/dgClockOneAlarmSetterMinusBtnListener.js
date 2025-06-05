
export default function dgClockOneAlarmSetterMinusBtnListener(DgClockObj) {

    const alarmSetterMinusBtn = DgClockObj.getAlarmSetterMinusBtn;
    let boolIsAlarmMinusBtnPressed;

    ["mousedown", "touchstart"].forEach(

        eventType => alarmSetterMinusBtn.addEventListener(eventType, callBackMouseDownListener)
    );

    function callBackMouseDownListener() {

        if (DgClockObj.getIsClockRunning === false)
            return;

        DgClockObj.cbOnAlarmSetterMinusBtn(boolIsAlarmMinusBtnPressed=true);
    }

    ["mouseup", /*"mouseleave", "mouseout",*/ "touchend", "touchcancel"]
        .forEach(

            eventType => alarmSetterMinusBtn.addEventListener(eventType, callBackMouseUpListener)
        );

    function callBackMouseUpListener() {

        if (DgClockObj.getIsClockRunning === false)
            return;

        DgClockObj.cbOnAlarmSetterMinusBtn(boolIsAlarmMinusBtnPressed=false);
    }
}

