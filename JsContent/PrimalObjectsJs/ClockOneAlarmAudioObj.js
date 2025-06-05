

class ClockOneAlarmAudioProcessor {

    "use strict";

    #audioObj;
    // Site gone
    //let sound = new Audio("https://www.freespecialeffects.co.uk/soundfx/animals/duck1.wav");

    constructor() {
    
        this.#audioObj = new Audio("JsContent/Sounds/DigitalAlarmClockSound.mp3");
        this.#audioObj.loop = true;
    }


    playAlarmSound() {

        this.#audioObj.play();
    }

    pauseAlarmSound() {

        this.#audioObj.pause();
    }

    stopAlarmSound() {

        this.#audioObj.pause();
    }
}

const ClockOneAlarmAudioObj = new ClockOneAlarmAudioProcessor();

export default ClockOneAlarmAudioObj;