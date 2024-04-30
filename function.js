// The function here takes the parameters that you
// have declared in the `glide.json` file, in the
// same order.
window.function = (quantity, fromUnit, toUnit) => {
    // This is a simple example of a function that
    // converts units.
    //
    // @param {object} qty The quantity to convert.
    // @param {object} fromUnit The unit to convert from.
    // @param {object} toUnit The unit to convert to.
    // @returns {number} The converted quantity.

    // For each parameter, its `.value` contains
    // either its value in the type you've declared,
    // or it's `undefined`.  This is a good place to
    // extract the `.value`s and assign default
    // values.
    quantity = quantity.value ?? 0;
    fromUnit = fromUnit.value;
    toUnit = toUnit.value;
    const converter = new unitConverter(quantity, fromUnit);
    return converter.as(toUnit).val();
}
