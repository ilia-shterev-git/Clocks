
export default function genericListener(eventToListenTo, callBackFn, domElement) {


    domElement.addEventListener(eventToListenTo, function (e) {

        callBackFn();
    });
}