export default function dgClockOneAlarmSetterSetBtnListener(DgClockOneObj) {

    const alarmSetterSetBtn = DgClockOneObj.getAlarmSetterSetBtn;

    function callBackForListener() {

        if (DgClockOneObj.getIsClockRunning === false)
            return;

        DgClockOneObj.cbOnAlarmSetterSetBtn();
    }

    alarmSetterSetBtn.addEventListener("click", callBackForListener);
}