let isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0&&value === null) return false
    // if(typeof value ==="number" && value.toString().trim.length===0) return false
    return true
}
