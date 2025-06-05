
/*import DmScrollListener from './DOMListenersJs/DmScrollListener.js';*/

import DarkModeProcessor from './ObjectsJs/DarkModeObj.js';

import DmMouseMoveAndScrollListenerObj from './DOMListenersJs/DmMouseMoveAndScrollListener.js';

import dmRegularTorchOnOffBtnListener from './DOMListenersJs/dmRegularTorchOnOffBtnListener.js';

import dmLightOnOffBtnListener from './DOMListenersJs/dmLightOnOffBtnListener.js';

import dmXrayTorchOnOffBtnListener from './DOMListenersJs/dmXrayTorchOnOffBtnListener.js';

import dmSpyNoteHoverListener from './DOMListenersJs/dmSpyNoteHoverListener.js';

import dmAnimationEndListener from './DOMListenersJs/dmAnimationEndListener.js';

(async function () {

    "use strict";

    const DarkModeObj = new DarkModeProcessor(DmMouseMoveAndScrollListenerObj);

    dmRegularTorchOnOffBtnListener(DarkModeObj);

    dmLightOnOffBtnListener(DarkModeObj);

    dmXrayTorchOnOffBtnListener(DarkModeObj);

    dmSpyNoteHoverListener(DarkModeObj);

    dmAnimationEndListener(DarkModeObj);

}());

