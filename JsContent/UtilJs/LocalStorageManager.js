
class LocalStorageManagerBla {

    "use strict";

    #tempValue;

    constructor() {
    
        this.#tempValue = "";
    }

    insertObjectValue(myKey, myObjectVal) {

        this.#tempValue = JSON.stringify(myObjectVal);

        localStorage.setItem(myKey, this.#tempValue);
    }

    getValueNoCheck(myKey) {

        this.#tempValue = localStorage.getItem(myKey);

        return this.#tempValue;l;
    }

    getObjectValue(myKey) {

        this.#tempValue = localStorage.getItem(myKey);

        if (this.#tempValue) {

            this.#tempValue = JSON.parse(this.#tempValue);

            return this.#tempValue;
        }

        return null;
    }

    getSingleValue(myKey, defaultReturnValue) {

        this.#tempValue = localStorage.getItem(myKey);

        if (this.#tempValue) {

            this.#tempValue = JSON.parse(this.#tempValue);

            return this.#tempValue;
        }

        return defaultReturnValue;
    }

    getBoolValue(myKey, defaultReturnValue) {

        this.#tempValue = localStorage.getItem(myKey);

        if (this.#tempValue) {

            this.#tempValue = JSON.parse(this.#tempValue);

            return this.#tempValue;
        }

        return defaultReturnValue;
    }

    insertSingleValue(myKey, myVal) {

        this.#tempValue = JSON.stringify(myVal);

        localStorage.setItem(myKey, this.#tempValue);
    }

    //insertSingleValue(myKey, myVal, propertyName) {

    //    this.#tempValue = JSON.stringify(myVal);

    //    localStorage.setItem(this.#LOCAL_STORAGE_IS_ALARM_ON_KEY, this.#tempValue);

    //    this.#localStorageObj = {};

    //    this.tempResult = localStorage.getItem(myKey);

    //    this.#localStorageAlarmObj = {};
    //    this.#localStorageAlarmObj.boolIsAlarmOn = this.#boolIsAlarmOn;

    //    this.#tempValue = JSON.stringify(this.#localStorageAlarmObj);

    //    localStorage.setItem(this.#LOCAL_STORAGE_IS_ALARM_ON_KEY, this.#tempValue);
    //}

    //checkReturnBoolValue(myKey, propertyName) {

    //    this.#tempValue = localStorage.getItem(myKey);

    //    if (this.#tempValue) {

    //        this.#localStorageObj = JSON.parse(this.#tempValue);

    //        return this.#localStorageObj[propertyName];
    //    }

    //    return false;
    //}
}

const LocalStorageManager = new LocalStorageManagerBla();

export default LocalStorageManager;