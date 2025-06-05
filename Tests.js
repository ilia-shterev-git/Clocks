

//==========================


//==========================

//function callbackHell(number, cb) {
//    setTimeout(function () {
//        if (isNaN(number)) {
//            return cb(number + 'is not a number');
//        }
//        cb(null, number * 2);
//    }, 500);
//}

//let tempResult = 1;

//callbackHell(tempResult, function (err, result) {
//    if (err) {
//        return console.log(err);
//    }

//    console.log("Step 1 - result ", result);

//    callbackHell(result, function (err, result) {
//        if (err) {
//            return console.log(err);
//        }

//        console.log("Step 2 - result ", result);
//    });
//});

//console.log('Calculating...');
//==========================
//function download(url, success, failure) {
//    setTimeout(() => {
//        console.log(`Downloading the picture from ${url} ...`);
//        !url ? failure(url) : success(url);
//    }, 1000);
//}

//download(
//    '',
//    (url) => console.log(`Processing the picture ${url}`),
//    (url) => console.log(`The '${url}' is not valid`)
//  );
//==========================

//==========================

//==========================
const createDeepCopy = (input) => {
    if (input instanceof Date) {
        return new Date(input.getTime()); // BASE CASE when input is of instance Date
    }
    if (typeof input !== "object") {
        return input; //BASE CASE
    }
    let copy = Array.isArray(input) ? [] : {};
    for (let key in input) {
        const value = input[key];
        copy[key] = createDeepCopy(value); //recursive call for each element of an array/object
    }

    return copy;
};

let original = { greetingOne: "hello world", greetingTwo: "from Sofia"};

let deepCopied =createDeepCopy(original);

//deepCopied[1] = 17
//deepCopied[2].location.city = "orlando"


console.log(deepCopied, original);
//==========================

//let original = [
//    city: "hello world",
//    24,
//    {
//        date: new Date(),
//        location: {
//            city: "tampa",
//        },
//    },
//];
