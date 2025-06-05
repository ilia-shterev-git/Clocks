
export default function anClockTwoAlarmSetterPlusBtnListener(AnClockTwoObj) {

    const alarmSetterPlusBtn = AnClockTwoObj.getAlarmSetterPlusBtn;

    let boolIsAlarmPlusBtnPressed;

    ["mousedown", "touchstart"].forEach(

        eventType => alarmSetterPlusBtn.addEventListener(eventType, callBackMouseDownListener)
    );

    function callBackMouseDownListener() {

        if (AnClockTwoObj.getIsClockRunning === false)
            return;

        AnClockTwoObj.cbOnAlarmSetterPlusBtn(boolIsAlarmPlusBtnPressed = true);
    }

    ["mouseup", /*"mouseleave", "mouseout", */"touchend", "touchcancel"]
        .forEach(

            eventType => alarmSetterPlusBtn.addEventListener(eventType, callBackMouseUpListener)
        );

    function callBackMouseUpListener() {

        if (AnClockTwoObj.getIsClockRunning === false)
            return;

        AnClockTwoObj.cbOnAlarmSetterPlusBtn(boolIsAlarmPlusBtnPressed = false);
    }
}