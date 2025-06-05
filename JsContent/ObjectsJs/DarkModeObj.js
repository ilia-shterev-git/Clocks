


import LIGHT_BTNS_PHRASES_ENUM from "../LanguagesManager/LangPhrasesEnums/LightBtnsEnum.js";

import LanguageDetectorObj from "../LanguagesManager/LanguageDetector.js";

export default class DarkModeProcessor {

    "use strict";

    #DmMouseMoveListenerObj; #AnalogClockTwoObj;

    #currentLanguagePhrases;

    /*#btnLightOnOff; #btnStartStopRegularTorch; #btnStartStopXrayTorch;*/

    #boolIsLightOn; #boolIsRegulraTorchOn; #boolIsXrayTorchOn;

    #dmLayer = document.getElementById("dmLayer");

    #dmDisplayNoneClass = "dm-display-none";
    #dmDisplayFullDarkClass = "dm-display-full-dark";
    #dmDisplayLightOnTorchOnClass = "dm-display-light-on-torch-on";
    #dmDisplayLightOffTorchOnClass = "dm-display-light-off-torch-on";
    #dmXrayTorchOnClass = "dm-x-ray-torch-on";
    #pointerEventsNone = "pointer-events-none";
    #visibilityHiddenClass = "visibility-hidden";
    #opacityZeroClass = "opacity-zero";
    #opacityOneClass = "opacity-one";
    #semiTransparentClass = "semi-transparent";

    #localCounter;

    #centeredContainer = document.getElementById("centeredContainer");

    #btnLightOnOff = document.getElementById("btnLightOnOff");
    get getBtnLightOnOff() { return this.#btnLightOnOff; };

    #btnStartStopRegularTorch = document.getElementById("btnStartStopRegularTorch");
    get getBtnStartStopRegularTorch() { return this.#btnStartStopRegularTorch; };

    #btnStartStopXrayTorch = document.getElementById("btnStartStopXrayTorch");
    get getBtnStartStopXrayTorch() { return this.#btnStartStopXrayTorch; };

    #spyNote = document.getElementById("spyNote");
    get getSpyNote() { return this.#spyNote; };

    #burningNoteBase = document.getElementById("burningNoteBase");

    #firstMessage = document.getElementById("firstMessage");
    #spyMessage = document.getElementById("spyMessage");

    #selfDestructAlert = document.getElementById("selfDestructAlert");
    get getSelfDestructMessage() { return this.#selfDestructAlert; };

    // The porpose of having AnalogClockTwoObj inside DarkModeObj is to
    // change second's color when light is On or Off
    constructor(DmMouseMoveListenerArgs, AnalogClockTwoArgs) {

        this.#AnalogClockTwoObj = AnalogClockTwoArgs;

        this.#localCounter = 0;

        this.#currentLanguagePhrases = LIGHT_BTNS_PHRASES_ENUM[LanguageDetectorObj.getCurrentLanguage];

        this.#boolIsLightOn = true; this.#boolIsRegulraTorchOn = false;

        this.#boolIsXrayTorchOn = false;
        // --------------------------------------
        this.#DmMouseMoveListenerObj = DmMouseMoveListenerArgs;

        this.#DmMouseMoveListenerObj.setCenteredContainer = this.#centeredContainer;

        this.#DmMouseMoveListenerObj.setDarkLayer = this.#dmLayer;

        this.#DmMouseMoveListenerObj.setDarkLayerOffset();

        this.#setLightOn_NoTorches();

        this.#setButtonsInitialText();
    }

    updateCurrentLanguage(newLanguageOption) {
    
        this.#currentLanguagePhrases = LIGHT_BTNS_PHRASES_ENUM[newLanguageOption];

        LanguageDetectorObj.saveCurrentLanguage(newLanguageOption);
    //----------------------------------------------
        if (this.#boolIsLightOn === true) {

            this.#btnLightOnOff.textContent = this.#currentLanguagePhrases.BtnLight_Off;
        }
        else {

            this.#btnLightOnOff.textContent = this.#currentLanguagePhrases.BtnLight_Off;
        }
    //----------------------------------------------
        if (this.#boolIsRegulraTorchOn === true) {

            this.#btnStartStopRegularTorch.textContent = this.#currentLanguagePhrases.BtnRegTorch_Off;
        }
        else {

            this.#btnStartStopRegularTorch.textContent = this.#currentLanguagePhrases.BtnRegTorch_On;
        }
        //----------------------------------------------
        if (this.#boolIsXrayTorchOn === true) {

            this.#btnStartStopXrayTorch.textContent = this.#currentLanguagePhrases.BtnXrayTorch_Off;
        }
        else {

            this.#btnStartStopXrayTorch.textContent = this.#currentLanguagePhrases.BtnXrayTorch_On;
        }
    }

    #setButtonsInitialText() {

        this.#btnLightOnOff.textContent = this.#currentLanguagePhrases.BtnLight_Off;

        this.#btnStartStopRegularTorch.textContent = this.#currentLanguagePhrases.BtnRegTorch_On;

        this.#btnStartStopXrayTorch.textContent = this.#currentLanguagePhrases.BtnXrayTorch_On;
    }

    get getBtnLightOnOff() { return this.#btnLightOnOff; };

    get getBtnStartStopRegularTorch() { return this.#btnStartStopRegularTorch; };

    get getBtnStartStopXrayTorch() { return this.#btnStartStopXrayTorch; };

    cbOnAnimationEnd(event) {

        if (event.animationName === "showAlarmMessage") {

            this.#selfDestructAlert.classList.remove("sticky-note-inner");

            this.#burningNoteBase.classList.add("burning-note-base");
            this.#burningNoteBase.classList.add("burning-note-base-burn");
        }
    }

    cbOnSpyNoteHover() {

        if (this.#boolIsXrayTorchOn === false)
            return;

        this.#localCounter++;

        if (this.#localCounter === 1) {

            let newP = this.#createParagraphWithCssClassAndText();
            this.#selfDestructAlert.appendChild(newP);
        }

        this.#selfDestructAlert.classList.add("show-alarm-message");
    }

    cbOnLightOnOff() {

        if (this.#boolIsXrayTorchOn === true)
            return;

        if (this.#boolIsLightOn === true) {

            if (this.#boolIsRegulraTorchOn === true) {

                this.#DmMouseMoveListenerObj.addMouseMoveListener();
                this.#DmMouseMoveListenerObj.addScrollListener();
                this.#dmLayer.className = this.#dmDisplayLightOffTorchOnClass;
                this.#DmMouseMoveListenerObj.setDarkLayerOffset();

                this.#btnStartStopXrayTorch.classList.remove(this.#visibilityHiddenClass);
            }
            else {

                this.#DmMouseMoveListenerObj.removeMouseMoveListener();
                this.#DmMouseMoveListenerObj.removeScrollListener();
                this.#dmLayer.className = this.#dmDisplayFullDarkClass;
            }

            this.#spyNote.classList.remove(this.#visibilityHiddenClass);
    
            this.#btnLightOnOff.textContent = this.#currentLanguagePhrases.BtnLight_On;
            this.#boolIsLightOn = false;

            this.#AnalogClockTwoObj.setNightlySeconds();
        }
        else {

            if (this.#boolIsRegulraTorchOn === true) {

                this.#DmMouseMoveListenerObj.addMouseMoveListener();
                this.#DmMouseMoveListenerObj.addScrollListener();
                this.#dmLayer.className = this.#dmDisplayLightOnTorchOnClass;
                this.#DmMouseMoveListenerObj.setDarkLayerOffset();
            }
            else {

                this.#DmMouseMoveListenerObj.removeMouseMoveListener();
                this.#DmMouseMoveListenerObj.removeScrollListener();
                this.#dmLayer.className = this.#dmDisplayNoneClass;
            }

            this.#spyNote.classList.add(this.#visibilityHiddenClass);

            this.#btnStartStopXrayTorch.classList.add(this.#visibilityHiddenClass);

            this.#btnLightOnOff.textContent = this.#currentLanguagePhrases.BtnLight_Off;
            this.#boolIsLightOn = true;

            this.#AnalogClockTwoObj.setDailySeconds();
        }
    }

    #setLightOn_NoTorches() {

        this.#dmLayer.className = this.#dmDisplayNoneClass;

        this.#DmMouseMoveListenerObj.removeMouseMoveListener();
        this.#DmMouseMoveListenerObj.removeScrollListener();
    }

    cbOnBtnXrayTorchHover() {

        if (this.#boolIsLightOn === true)
            return;

        this.#btnStartStopXrayTorch.classList.add(this.#opacityOneClass);
        this.#btnStartStopXrayTorch.classList.remove(this.#opacityZeroClass);
    }

    cbOnBtnXrayMouseOut() {

        if (this.#boolIsLightOn === true)
            return;

        this.#btnStartStopXrayTorch.classList.add(this.#opacityZeroClass);
        this.#btnStartStopXrayTorch.classList.remove(this.#opacityOneClass);
    }

    cbOnBtnXrayTorchOnOff() {

        if (this.#boolIsLightOn === true)
            return;

        if (this.#boolIsXrayTorchOn === true) {

            this.#spyMessage.classList.add(this.#visibilityHiddenClass);

            this.#firstMessage.classList.remove(this.#semiTransparentClass);

            this.#btnLightOnOff.classList.remove(this.#pointerEventsNone);
            this.#btnStartStopRegularTorch.classList.remove(this.#pointerEventsNone);
            this.#dmLayer.className = this.#dmDisplayLightOffTorchOnClass;

            this.#btnStartStopXrayTorch.textContent = this.#currentLanguagePhrases.BtnXrayTorch_On;

            this.#boolIsXrayTorchOn = false;
        }
        else {

            this.#spyMessage.classList.remove(this.#visibilityHiddenClass);

            this.#firstMessage.classList.add(this.#semiTransparentClass);

            this.#btnLightOnOff.classList.add(this.#pointerEventsNone);
            this.#btnStartStopRegularTorch.classList.add(this.#pointerEventsNone);
            this.#dmLayer.className = this.#dmXrayTorchOnClass;

            this.#btnStartStopXrayTorch.textContent = this.#currentLanguagePhrases.BtnXrayTorch_Off;

            this.#boolIsXrayTorchOn = true;
        }
    }

    cbOnBtnRegularTorchOnOff(event) {

        if (this.#boolIsXrayTorchOn === true)
            return;      
        
        if (this.#boolIsRegulraTorchOn === true) {

            if (this.#boolIsLightOn === true) {

                this.#dmLayer.className = this.#dmDisplayNoneClass;
            }
            else {

                this.#dmLayer.className = this.#dmDisplayFullDarkClass;
            }

            this.#DmMouseMoveListenerObj.removeMouseMoveListener();
            this.#DmMouseMoveListenerObj.removeScrollListener();

            this.#btnStartStopXrayTorch.classList.add(this.#visibilityHiddenClass);
            this.#btnStartStopRegularTorch.textContent = this.#currentLanguagePhrases.BtnRegTorch_On;
            this.#boolIsRegulraTorchOn = false;
        }
        else {

            if (this.#boolIsLightOn === true) {

                this.#dmLayer.className = this.#dmDisplayLightOnTorchOnClass;
            }
            else {

                this.#dmLayer.className = this.#dmDisplayLightOffTorchOnClass;
                this.#btnStartStopXrayTorch.classList.remove(this.#visibilityHiddenClass);           
            }

            this.#DmMouseMoveListenerObj.cbOnMouseClick(event);
           
            this.#DmMouseMoveListenerObj.addMouseMoveListener();
            this.#DmMouseMoveListenerObj.addScrollListener();           

            this.#btnStartStopRegularTorch.textContent = this.#currentLanguagePhrases.BtnRegTorch_Off;
            this.#boolIsRegulraTorchOn = true;
        }
    }

    #createParagraphWithCssClassAndText() {

        let newP = document.createElement("p");
        newP.classList.add("self-destruct-note");
        newP.textContent = "Self destruct mechanism engaged.";

        return newP;
    }
}
