
class ClockTwoAlarmAudioProcessor {

    "use strict";

    #audioObj;

    constructor() {

        this.#audioObj = new Audio("JsContent/Sounds/MechAlarmSound.mp3");
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

const ClockTwoAlarmAudioObj = new ClockTwoAlarmAudioProcessor();

export default ClockTwoAlarmAudioObj;


