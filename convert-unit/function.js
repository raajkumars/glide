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

    // For each parameter, its `.value` contains
    // either its value in the type you've declared,
    // or it's `undefined`.
    const quantity = quantity.value ?? 0;
    const fromUnit = lowerCase(this.currentUnit);
    const toUnit = lowerCase(this.targetUnit);
    if (fromUnit === toUnit) {
        return quantity;
    }

    return math.unit(quantity, fromUnit).toNumber(toUnit);
}
