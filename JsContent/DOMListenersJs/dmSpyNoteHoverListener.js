
export default function dmSpyNoteHoverListener(DarkModeObj) {

    const spyNote = DarkModeObj.getSpyNote;

    function cbOnClick(event) {

        DarkModeObj.cbOnSpyNoteHover();

    }

    spyNote.addEventListener("mouseover", cbOnClick);
}