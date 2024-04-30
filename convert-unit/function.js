// The function here takes the parameters that you
// have declared in the `glide.json` file, in the
// same order.
window.function = (quantity, fromUnit, toUnit) => {
    // Converts quantity from one unit to another.
    //
    // @param {object} quantity The quantity to convert.
    // @param {object} fromUnit The unit to convert from.
    // @param {object} toUnit The unit to convert to.
    // @returns {number} The converted quantity.

    function toLowerCaseString(value) {
        // Check if the argument is provided and not null
        if (value != null) {
            // Convert to string in case it's not, then to lowercase
            return String(value).toLowerCase();
        }
        // Return a default value or null if no input was provided
        return null;
    }

    // For each parameter, its `.value` contains
    // either its value in the type you've declared,
    // or it's `undefined`.
    quantity = quantity.value ?? 0;
    fromUnit = toLowerCaseString(fromUnit.value);
    toUnit = toLowerCaseString(toUnit.value);
    if (fromUnit === toUnit) {
        return quantity;
    }

    return math.unit(quantity, fromUnit).toNumber(toUnit);
}
