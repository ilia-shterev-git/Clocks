
export default function dgClockOnesAlarmSetterPlusBtnListener(DgClockOneObj) {

    const alarmSetterPlusBtn = DgClockOneObj.getAlarmSetterPlusBtn;

    let boolIsAlarmPlusBtnPressed;

    ["mousedown", "touchstart"].forEach(
        
        eventType => alarmSetterPlusBtn.addEventListener(eventType, callBackMouseDownListener)
    );

    function callBackMouseDownListener() {

        if (DgClockOneObj.getIsClockRunning === false)
            return;

        DgClockOneObj.cbOnAlarmSetterPlusBtn(boolIsAlarmPlusBtnPressed=true);
    }

    ["mouseup", /*"mouseleave", "mouseout"*/ "touchend", "touchcancel"]
        .forEach(

            eventType => alarmSetterPlusBtn.addEventListener(eventType, callBackMouseUpListener)
        );

    function callBackMouseUpListener() {

        if (DgClockOneObj.getIsClockRunning === false)
            return;

        DgClockOneObj.cbOnAlarmSetterPlusBtn(boolIsAlarmPlusBtnPressed=false);
    }
}