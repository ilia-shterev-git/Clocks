

export default function dgClockOneAlarmSnoozeBtnListener(DgClockOneObj) {

    const alarmSnoozeBtn = DgClockOneObj.getAlarmSnoozeBtn;

    function callBackForListener() {

        if (DgClockOneObj.getIsClockRunning === false)
            return;

        DgClockOneObj.cbOnAlarmSnoozeBtn();
    }

    alarmSnoozeBtn.addEventListener("click", callBackForListener);
}