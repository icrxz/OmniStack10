module.exports = function parseString(arrayAsString) {
    return arrayAsString.split(',').map(tech => tech.trim());
}