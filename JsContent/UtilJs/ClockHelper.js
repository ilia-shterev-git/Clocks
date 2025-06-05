


export default class ClockHelper {

    
    "use strict";

    static checkSetPMHoursOffset(currentHour) {

        const PM_HOURS_OFFSET = 12;

        const PM_HOURS_TRESHOLD = 12;

        if (currentHour > PM_HOURS_TRESHOLD)

            currentHour = currentHour - PM_HOURS_OFFSET;

        return currentHour;
    }

    static getStringFromNumber(someNumber) {

        let tmpString = someNumber.toString();

        if (someNumber < 10)
            tmpString = '0' + tmpString;

        return tmpString;
    }

    static getSetNumberToTwoDigitsString(someNumber) {

        let tmpString="";

        if (someNumber < 10)
            tmpString = "0" + someNumber.toString();
        else if ((someNumber > 9) && (someNumber < 61))
            tmpString = someNumber.toString();

        return tmpString;
    }
}
