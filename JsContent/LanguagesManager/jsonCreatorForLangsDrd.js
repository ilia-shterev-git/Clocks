
import LANGUAGES_ENUM from "./LanguagesEnum.js";

export default function jsonCreatorForDrd() {

    "use strict";
    const languagesForDrd = [{
        langAbreviation: LANGUAGES_ENUM.English,
        langName: "EN"
    },
    {
        langAbreviation: LANGUAGES_ENUM.Bulgarian,
        langName: "BG"
    }];

    const languagesForDrdJson = JSON.stringify(languagesForDrd);

    return languagesForDrdJson;
}
