const dmcColors = require("../data/dmcColors");

// query for hex code, mode, and count
// find color that is within a certain number of points from the r g and b. From that list, find the closest hex code.

function generateScheme(req, res, next) {
    const colorCode = req.query.colorCode;
    const mode = req.query.mode;
    const count = req.query.count;

    if (!colorCode) {
        res.status(400).json({ message: 'Please provide the colorCode in your request.' });
    }

    const colorProfile = dmcColors.find(color => color.dmcColor == colorCode);

    if (!colorProfile) {
        res.status(400).json({ message: 'Please provide a valid color code.' });
    }

    const apiResponse = colorApi(colorProfile.hexCode, mode, count);
    res.status(200).json({ data: `The hex code is ${colorProfile.hexCode}` });
};

function colorApi(hexCode, mode, count) {
    const query = {
        hexCode: hexCode,
        mode: mode,
        count: count
    };
    const colorSchemeQuery = formQueryString(query);

    fetchResults(colorSchemeQuery);
}

function formQueryString(query) {
    let queryString = `?hex=${query.hexCode}`;
    query.mode ? queryString += `&mode=${query.mode}` : null;
    query.count ? queryString += `&count=${query.count}` : null;
    return queryString;
}

async function fetchResults(apiQuery) {
    const response = await fetch(`https://www.thecolorapi.com/scheme${apiQuery}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer"
    })
        .then(response => response.text())
        .then(data => checkDmcColors(JSON.parse(data)))
        .catch(e => console.log(e.message));
}

function checkDmcColors(results) {
    let foundColors = [];
    let missingColors = [];

    results.colors.forEach(color => {
        let colorProfile = dmcColors.find(dmcColor => dmcColor.hexCode == color.hex.clean);
        if (colorProfile) {
            foundColors.push(colorProfile);
        }
        missingColors.push(color);
    });

    if (missingColors.length > 0) {
        findSimilarColors(missingColors);
    }
}

function findSimilarColors(missingColors) {
    let similarColors = [];

    missingColors.forEach(missingColor => {
        let num = 30;
        let foundColors;

        while (!foundColors) {
            foundColors = dmcColors.filter(dmc => {
                return Math.abs(missingColor.rgb.r - dmc.r) <= num && Math.abs(missingColor.rgb.g - dmc.g) <= num && Math.abs(missingColor.rgb.b - dmc.b) <= num;
            });

            if (foundColors) {
                similarColors.push(foundColors);
            }
            num += 20;
        }
        console.log(similarColors);
    });


}

module.exports = {
    read: [generateScheme]
}