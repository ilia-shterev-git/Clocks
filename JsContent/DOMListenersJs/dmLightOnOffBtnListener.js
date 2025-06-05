

export default function dmLightOnOffBtnListener(DarkModeObj) {

    const btnLightOnOff = DarkModeObj.getBtnLightOnOff;

    function callBackForListener() {

        DarkModeObj.cbOnLightOnOff();
    }

    btnLightOnOff.addEventListener("click", callBackForListener);
}
