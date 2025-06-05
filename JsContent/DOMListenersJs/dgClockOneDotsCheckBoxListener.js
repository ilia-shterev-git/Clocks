


export default function dgClockOneDotsCheckBoxListener(DgClockOneObj) {

    const dotsCheckBoxSwitch = DgClockOneObj.getDotsCheckBoxSwitch;

    function callBackForListener() {

        if (DgClockOneObj.getIsClockRunning === false)
            return;

        DgClockOneObj.cbOnDotsCheckBoxSwitch(dotsCheckBoxSwitch.checked);
    }

    dotsCheckBoxSwitch.addEventListener("change", callBackForListener);
}