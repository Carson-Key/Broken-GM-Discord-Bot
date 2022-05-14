const { determinePlurality } = require("./misc");

const ageStringGenerater = (data) => {
    let returnedValue = ""
    let arrayOfKeys = Object.keys(data).reverse()
    arrayOfKeys.splice(arrayOfKeys.length - 1, 1)

    arrayOfKeys.forEach((key, i) => { 
        const valueAtKey = data[key]
        const timeUnitString = determinePlurality(valueAtKey, key, true)

        if (i === (arrayOfKeys.length - 2)) {
            returnedValue = 
                returnedValue + 
                valueAtKey.toString() + " " + timeUnitString + ", and "
        } else if (i === (arrayOfKeys.length - 1)) {
            returnedValue = 
                returnedValue + 
                valueAtKey.toString() + " " + timeUnitString
        } else {
            returnedValue = 
                returnedValue + 
                valueAtKey.toString() + " " + timeUnitString + ", "
        }
    })
    
    return returnedValue
};

exports.ageStringGenerater = ageStringGenerater;