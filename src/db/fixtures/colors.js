const colorList = require('../../../test/dmcColors');

const finalList = colorList.map((color)=> {
    let colorInfo = {};
    colorInfo.color_name = color.color_name;
    colorInfo.color_code = color.color_code;
    colorInfo.r = color.r;
    colorInfo.g = color.g;
    colorInfo.b = color.b;
    colorInfo.hex_code = color.hex_code;
    return colorInfo;
});

module.exports = finalList;
