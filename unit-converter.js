const unitConverter = (function() {
    const table = {};

    function UnitConverter(value, unit) {
        this.value = value;
        this.currentUnit = unit;
    }

    UnitConverter.prototype.as = function(targetUnit) {
        this.targetUnit = targetUnit;
        return this;
    };

    UnitConverter.prototype.is = function(currentUnit) {
        this.currentUnit = currentUnit;
        return this;
    };

    UnitConverter.prototype.val = function() {
        const target = table[this.targetUnit];
        if (!target) {
            throw new Error('Unknown target unit "' + this.targetUnit + '"');
        }
        const current = table[this.currentUnit];
        if (!current) {
            throw new Error('Unknown current unit "' + this.currentUnit + '"');
        }
        if (target.base !== current.base) {
            throw new Error('Incompatible units; cannot convert from "' + this.currentUnit + '" to "' + this.targetUnit + '"');
        }
        return this.value * (current.multiplier / target.multiplier);
    };

    UnitConverter.prototype.toString = function() {
        return this.val() + ' ' + this.targetUnit;
    };

    UnitConverter.prototype.debug = function() {
        return this.value + ' ' + this.currentUnit + ' is ' + this.val() + ' ' + this.targetUnit;
    };

    UnitConverter.addUnit = function(baseUnit, actualUnit, multiplier) {
        table[actualUnit] = { base: baseUnit, actual: actualUnit, multiplier: multiplier };
    };

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
    UnitConverter.addUnit('bunch', 'bunch', 1);
    UnitConverter.addUnit('piece', 'piece', 1);
    UnitConverter.addUnit('pkt', 'pkt', 1);

    return UnitConverter;
})();