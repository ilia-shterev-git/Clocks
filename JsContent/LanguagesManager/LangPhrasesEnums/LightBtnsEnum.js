

import LANGUAGES_ENUM from "../LanguagesEnum.js";

const LIGHT_BTNS_PHRASES_ENUM = {};

LIGHT_BTNS_PHRASES_ENUM[LANGUAGES_ENUM.English] = {

    BtnLight_On: "Light on",
    BtnLight_Off: "Light off",
    BtnRegTorch_On: "Torch on",
    BtnRegTorch_Off: "Torch off",
    BtnXrayTorch_On: "X-ray torch on",
    BtnXrayTorch_Off: "X-ray torch off",
};

LIGHT_BTNS_PHRASES_ENUM[LANGUAGES_ENUM.Bulgarian]  = {

    BtnLight_On: "Вкл. осветление",
    BtnLight_Off: "Изкл. осветление",
    BtnRegTorch_On: "Вкл. фенерче",
    BtnRegTorch_Off: "Изкл. фенерче",
    BtnXrayTorch_On: "Вкл. рентг. фенерче",
    BtnXrayTorch_Off: "Изкл. рентг. фенерче",
};

export default LIGHT_BTNS_PHRASES_ENUM;