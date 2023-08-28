const dmcColors = require("../data/dmcColors");

function getAllColors(req, res) {
    return res.status(200).json(dmcColors);
}

module.exports = {
    read: [getAllColors]
}
