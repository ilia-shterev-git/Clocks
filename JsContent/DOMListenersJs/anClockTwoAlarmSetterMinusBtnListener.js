
export default function anClockTwoAlarmSetterMinusBtnListener(AnClockTwoObj) {

    const alarmSetterMinusBtn = AnClockTwoObj.getAlarmSetterMinusBtn;

    let boolIsAlarmMinusBtnPressed;

    ["mousedown", "touchstart"].forEach(

        eventType => alarmSetterMinusBtn.addEventListener(eventType, callBackMouseDownListener)
    );

    function callBackMouseDownListener() {

        if (AnClockTwoObj.getIsClockRunning === false)
            return;

        AnClockTwoObj.cbOnAlarmSetterMinusBtn(boolIsAlarmMinusBtnPressed = true);
    }

    ["mouseup", /*"mouseleave", "mouseout", */"touchend", "touchcancel"]
        .forEach(

            eventType => alarmSetterMinusBtn.addEventListener(eventType, callBackMouseUpListener)
        );

    function callBackMouseUpListener() {

        if (AnClockTwoObj.getIsClockRunning === false)
            return;

        AnClockTwoObj.cbOnAlarmSetterMinusBtn(boolIsAlarmMinusBtnPressed = false);
    }
}