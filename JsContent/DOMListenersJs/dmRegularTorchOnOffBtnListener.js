

export default function dmRegularTorchOnOffBtnListener(DarkModeObj) {

    const btnStartStopRegularTorch = DarkModeObj.getBtnStartStopRegularTorch;

    function cbOnClick(event) {

        DarkModeObj.cbOnBtnRegularTorchOnOff(event);

    }

    btnStartStopRegularTorch.addEventListener("click", cbOnClick);

    //function cbOn(event) {

    //    this.#DmMouseMoveListenerObj.cbOnMouseUp(event);
    //}

    //btnStartStopRegularTorch.addEventListener("mouseup", cbOn);
}

