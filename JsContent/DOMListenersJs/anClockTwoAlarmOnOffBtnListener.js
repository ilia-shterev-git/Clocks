
export default function anClockTwoAlarmOnOffBtnListener(AnClockTwoObj) {

    const analogAlarmOnOffBtn = AnClockTwoObj.getAlarmOnOffBtn;

    function callBackForListener(event) {

        if (AnClockTwoObj.getIsClockRunning === false)
            return;

        AnClockTwoObj.cbOnAlarmOnOffBtn();
    }

    function callBackOnTransitionEnd(event) {

        if (AnClockTwoObj.getIsClockRunning === false)
            return;

        if (event.propertyName === "transform")

            AnClockTwoObj.cbOnAlarmOnOffBtn_TransitionEnd();
    }

    analogAlarmOnOffBtn.addEventListener("click", callBackForListener);
    analogAlarmOnOffBtn.addEventListener("transitionend", callBackOnTransitionEnd);
}
