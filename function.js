// The function here takes the parameters that you
// have declared in the `glide.json` file, in the
// same order.
window.convertUnit = function (qty, fromUnit, toUnit) {
    // This is a simple example of a function that
    // converts units.
    //
    // @param {number} qty The quantity to convert.
    // @param {string} fromUnit The unit to convert from.
    // @param {string} toUnit The unit to convert to.
    // @returns {number} The converted quantity.
    const converter = new unitConverter(qty, fromUnit);
    return converter.as(toUnit).val()
}
