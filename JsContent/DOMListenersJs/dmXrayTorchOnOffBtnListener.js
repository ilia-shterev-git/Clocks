

export default function dmXrayTorchOnOffBtnListener(DarkModeObj) {

    const btnStartStopXrayTorch = DarkModeObj.getBtnStartStopXrayTorch;

    function cbOnClick() {

        DarkModeObj.cbOnBtnXrayTorchOnOff();
    }

    btnStartStopXrayTorch.addEventListener("click", cbOnClick);


    function cbOnHover() {

        DarkModeObj.cbOnBtnXrayTorchHover();
    }

    btnStartStopXrayTorch.addEventListener("mouseover", cbOnHover);

    function cbOnMouseOut() {

        DarkModeObj.cbOnBtnXrayMouseOut();
    }

    btnStartStopXrayTorch.addEventListener("mouseout", cbOnMouseOut);

}