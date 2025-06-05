
export default function dmAnimationEndListener(DarkModeObj) {

    const selfDestructMessage = DarkModeObj.getSelfDestructMessage;

    function cbOnClick(event) {

        DarkModeObj.cbOnAnimationEnd(event);

    }

    selfDestructMessage.addEventListener("animationend", cbOnClick);
}
