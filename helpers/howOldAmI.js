const { determinePlurality } = require("./misc");

const ageStringGenerater = (data) => {
    let returnedValue = ""
    let arrayOfKeys = Object.keys(data).reverse()
    arrayOfKeys.splice(arrayOfKeys.length - 1, 1)
    let newLength = arrayOfKeys.length

    arrayOfKeys.forEach((key, i) => { 
        const valueAtKey = data[key]
        const timeUnitString = determinePlurality(valueAtKey, key, true)

        if (valueAtKey !== 0) {
            if (i === (newLength - 2) && newLength > 2) {
                returnedValue = 
                    returnedValue + 
                    valueAtKey.toString() + " " + timeUnitString + ", and "
            } else if (i === (newLength - 1) && newLength > 1) {
                returnedValue = 
                    returnedValue + 
                    valueAtKey.toString() + " " + timeUnitString
            } else {
                returnedValue = 
                    returnedValue + 
                    valueAtKey.toString() + " " + timeUnitString + ", "
            }
        } else {
            newLength - 1
        }
    })
    
    return returnedValue
};

exports.ageStringGenerater = ageStringGenerater;