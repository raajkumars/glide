/**
 * Represents a unit converter.
 * @typedef {Object} UnitConverter
 * @property {number} value - The value to be converted.
 * @property {string} currentUnit - The current unit of measurement.
 * @property {string} targetUnit - The target unit of measurement.
 * @property {function} as - Sets the target unit of measurement.
 * @property {function} is - Sets the current unit of measurement.
 * @property {function} val - Converts the value from the current unit to the target unit.
 * @property {function} toString - Returns the converted value and the target unit as a string.
 * @property {function} debug - Returns a debug string showing the current value, current unit, converted value, and target unit.
 */

/**
 * Represents a unit converter.
 * @function unitConverter
 * @returns {UnitConverter} An instance of the UnitConverter class.
 */
const unitConverter = (function () {
    var instance;

    function init() {
        const table = {};

        class UnitConverter {
            constructor(value, unit) {
                this.value = value;
                this.currentUnit = unit;
            }
            static addUnit(baseUnit, actualUnit, multiplier) {
                table[actualUnit] = { base: baseUnit, actual: actualUnit, multiplier: multiplier };
            }
            as(targetUnit) {
                this.targetUnit = targetUnit;
                return this;
            }
            is(currentUnit) {
                this.currentUnit = currentUnit;
                return this;
            }
            val() {
                const fromUnit = lowerCase(this.currentUnit);
                const toUnit = lowerCase(this.targetUnit);
                if (fromUnit === toUnit) {
                    return this.value;
                }

                const target = table[toUnit];
                if (!target) {
                    throw new Error('Unknown target unit "' + this.targetUnit + '"');
                }
                const current = table[fromUnit];
                if (!current) {
                    throw new Error('Unknown current unit "' + this.currentUnit + '"');
                }
                if (target.base !== current.base) {
                    throw new Error('Incompatible units; cannot convert from "' + this.currentUnit + '" to "' + this.targetUnit + '"');
                }
                return this.value * (current.multiplier / target.multiplier);
            }
            toString() {
                return this.val() + ' ' + this.targetUnit;
            }
            debug() {
                return this.value + ' ' + this.currentUnit + ' is ' + this.val() + ' ' + this.targetUnit;
            }
        }

        const prefixes = ['Y', 'Z', 'E', 'P', 'T', 'G', 'M', 'k', 'h', 'da', '', 'd', 'c', 'm', 'u', 'n', 'p', 'f', 'a', 'z', 'y'];
        const factors = [24, 21, 18, 15, 12, 9, 6, 3, 2, 1, 0, -1, -2, -3, -6, -9, -12, -15, -18, -21, -24];
        const units = ['g', 'b', 'l', 'm'];

        for (let j = 0; j < units.length; j++) {
            const base = units[j];
            for (let i = 0; i < prefixes.length; i++) {
                UnitConverter.addUnit(base, prefixes[i] + base, Math.pow(10, factors[i]));
            }
        }

        // Add non-SI units and conversions
        UnitConverter.addUnit('g', 'ounce', 28.3495231);
        UnitConverter.addUnit('g', 'oz', 28.3495231);
        UnitConverter.addUnit('g', 'pound', 453.59237);
        UnitConverter.addUnit('g', 'lb', 453.59237);

        return UnitConverter;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();

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
    const UnitConverter = unitConverter.getInstance();
    /**
     * Represents a unit converter.
     * @type {UnitConverter}
     */
    const converter = new UnitConverter(quantity.value ?? 0, fromUnit.value);
    return converter.as(toUnit.value).val();
}
