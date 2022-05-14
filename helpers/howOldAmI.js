const ageStringGenerater = (data) => {
    let returnedValue = ""
    let arrayOfKeys = Object.keys(data).reverse()
    arrayOfKeys.splice(arrayOfKeys.length - 1, 1)

    arrayOfKeys.forEach((key, i) => { 
        if (i === (arrayOfKeys.length - 2)) {
            returnedValue = 
                returnedValue + 
                data[key].toString() + " " + key + ", and "
        } else if (i === (arrayOfKeys.length - 1)) {
            returnedValue = 
                returnedValue + 
                data[key].toString() + " " + key
        } else {
            returnedValue = 
                returnedValue + 
                data[key].toString() + " " + key + ", "
        }
    })
    
    return returnedValue
};

exports.ageStringGenerater = ageStringGenerater;