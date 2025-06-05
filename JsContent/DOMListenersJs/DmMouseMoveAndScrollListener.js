

function DmMouseMoveForTorchListener() {

    "use strict";

    let useCapture = true
        , styleY = ""
        , styleX = ""
        , pos
        , xPos = 0
        , yPos = 0
        , tempVar = 0
        , newScrollYOffset = 0
        , oldScrollYOffset = 0
        , elementOffsetX
        , elementOffsetY
        , darkLayer
        , centeredContainer;

    this.setDarkLayerOffset = function() {

        elementOffsetX = darkLayer.offsetWidth / 2;
        elementOffsetY = darkLayer.offsetHeight / 2;
    };

    this.cbOnMouseClick = (function (event) {

        event.stopPropagation();

        this.setDarkLayerOffset();

        xPos = event.pageX;
        yPos = event.pageY;

        tempVar = (window.innerWidth - centeredContainer.offsetWidth);

        if (tempVar > 0)

            xPos = xPos - (tempVar / 2);

        xPos = (xPos - elementOffsetX);
        yPos = (yPos - elementOffsetY);

        styleX = xPos + "px";
        styleY = yPos + "px";

        darkLayer.style.left = styleX;
        darkLayer.style.top = styleY;

    }).bind(this);

    let cbOnMouseMove = (function (event) {

        event.stopPropagation();

        xPos = event.pageX;
        yPos = event.pageY;

        /*yPos = yPos - window.scrollY;*/

        pos = event.currentTarget.getBoundingClientRect();

        xPos = (xPos - pos.left);
        yPos = (yPos - pos.top);

        xPos = (xPos - elementOffsetX);
        yPos = (yPos - elementOffsetY);    

        yPos = yPos - newScrollYOffset;

        styleX = xPos + "px";
        styleY = yPos + "px";

        darkLayer.style.left = styleX;
        darkLayer.style.top = styleY;

    }).bind(this);

    let cbOnScroll = (function ()  {

        newScrollYOffset = window.scrollY;

        yPos = yPos + newScrollYOffset;

        yPos = yPos - oldScrollYOffset;

        oldScrollYOffset = newScrollYOffset;

        styleY = yPos + "px";
        darkLayer.style.top = styleY;

    }).bind(this);

    this.removeMouseMoveListener = function () {

        centeredContainer.removeEventListener("mousemove", cbOnMouseMove, useCapture);
    };

    this.addMouseMoveListener = function () {

        centeredContainer.addEventListener("mousemove", cbOnMouseMove, useCapture);
    };

    this.addScrollListener = function () {

        window.addEventListener("scroll", cbOnScroll);
    };

    this.removeScrollListener = function () {

        window.removeEventListener("scroll", cbOnScroll);
    };

    Object.defineProperties(this, {
        setCenteredContainer: {
            set: function (centeredContainerArg) {
                centeredContainer = centeredContainerArg;
            }
        }
    });

    Object.defineProperties(this, {
        setDarkLayer: {
            set: function (darkLayerArg) {
                darkLayer = darkLayerArg;
            }
        }
    });
}

const DmMouseMoveListener = new DmMouseMoveForTorchListener();

export default DmMouseMoveListener;