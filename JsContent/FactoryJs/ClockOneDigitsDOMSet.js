const DIGITS_PAIRING_ENUM = {

	HOURS: {
		LEFT_Digit: "HRS10"
		, RIGHT_Digit: "HRS01"
	},

	MINUTES: {
		LEFT_Digit: "MINS10"
		, RIGHT_Digit: "MINS01"
	},

	SECONDS: {
		LEFT_Digit: "SCS10"
		, RIGHT_Digit: "SCS01"
	}
}

export function loadAllDigitsDomElements() {

	let DIGITS_DOM_ELEMENTS_SET = {};

	DIGITS_DOM_ELEMENTS_SET[DIGITS_PAIRING_ENUM.SECONDS.LEFT_Digit]
		= document.getElementById('clock-1-seconds-left-digit');
	DIGITS_DOM_ELEMENTS_SET[DIGITS_PAIRING_ENUM.SECONDS.RIGHT_Digit]
		= document.getElementById('clock-1-seconds-right-digit');

	DIGITS_DOM_ELEMENTS_SET[DIGITS_PAIRING_ENUM.MINUTES.LEFT_Digit]
		= document.getElementById('clock-1-mins-left-digit');
	DIGITS_DOM_ELEMENTS_SET[DIGITS_PAIRING_ENUM.MINUTES.RIGHT_Digit]
		= document.getElementById('clock-1-mins-right-digit');

	DIGITS_DOM_ELEMENTS_SET[DIGITS_PAIRING_ENUM.HOURS.LEFT_Digit]
		= document.getElementById('clock-1-hrs-left-digit');
	DIGITS_DOM_ELEMENTS_SET[DIGITS_PAIRING_ENUM.HOURS.RIGHT_Digit]
		= document.getElementById('clock-1-hrs-right-digit');

	return DIGITS_DOM_ELEMENTS_SET;
}


export default DIGITS_PAIRING_ENUM;