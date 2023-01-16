const sampleValidData = {
    age: 1,
    what_bothers_you: 'family'
}

export function isValidCSV(param) {
    let result = 1;
    for (let i = 0; i < param.length; i++) {
        validChecker(param[i], sampleValidData)? result *= 1 : result *= 0;
    }
    return result;
}
    
var validChecker = function (obj, validObj) {
    let rslt = 1;
    let existKeys = 0;
    for (const validKey in validObj) {
        for (const key in obj) {
            if (key == validKey){
                (typeof obj[key] === typeof validObj[validKey])? rslt *= 1 : rslt *= 0;
                existKeys ++;
            }
        }
    }
    (existKeys == Object.keys(validObj).length) ? rslt *= 1 : rslt *= 0;
    return rslt;
}
