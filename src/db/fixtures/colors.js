const colorList = require('../../../test/dmcColors');

const finalList = colorList.map((color)=> {
    let colorInfo = {};
    colorInfo.color_name = color.dmcName;
    colorInfo.color_code = color.dmcColor;
    colorInfo.r = color.r;
    colorInfo.g = color.g;
    colorInfo.b = color.b;
    colorInfo.hex_code = color.hexCode;
    return colorInfo;
});

module.exports = finalList;
