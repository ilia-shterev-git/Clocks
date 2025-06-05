

export default function dgClockOne_12_24_ListenerSetup(ClockObj) {

    const clocks_12_24_Switch = ClockObj.getClocks_12_24_Switch;

    function callBackOnChange(event) {

        if (ClockObj.getIsClockRunning === false)
            return;

        ClockObj.cbOn_12_24_Switch(event.target.id);
    }

    function callBackOnTransitionEnd(event) {

        if (ClockObj.getIsClockRunning === false)
            return;

        if (event.propertyName === "left")

            ClockObj.cbOn_12_24_Switch_TransitionEnd_Set_12_24_Indicators_SetHour();
    }

    clocks_12_24_Switch.addEventListener("change", callBackOnChange);

    clocks_12_24_Switch.addEventListener("transitionend", callBackOnTransitionEnd);
}