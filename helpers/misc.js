const determinePlurality = (value, string, startsPlural = false) => {
    let returnValue = string

    if (value === 1)  {
        if (!startsPlural) {
            if (string[string.length - 1] === 's') {
                returnValue = string + "'"
            } else {
                returnValue = string + 's'
            }
        } else {
            returnValue = string.slice(0, -1)
        }
    }

    return returnValue
}

exports.determinePlurality = determinePlurality;