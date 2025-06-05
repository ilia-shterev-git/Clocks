

export default function dgClockOneAlarmSetterRangeListener(DgClockOneObj) {

    const alarmSetterRangeSlider = DgClockOneObj.getAlarmSetterRangeSlider;

    let strRangeValue;

    function callBackForListener() {

        if (DgClockOneObj.getIsClockRunning === false)
            return;

        strRangeValue = alarmSetterRangeSlider.value;

        DgClockOneObj.cbSetAlarmOnRangeSliderListener(strRangeValue);
    }

    alarmSetterRangeSlider.addEventListener("input", callBackForListener);
}