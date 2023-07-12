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
    let closestMatch = {};

    missingColors.forEach(missingColor => {
        let distance = 442;
        for(let i = 0; i < dmcColors.length; i++) {
            let d = Math.sqrt(Math.pow((missingColor.rgb.r - dmcColors[i].r), 2) + Math.pow((missingColor.rgb.g - dmcColors[i].g), 2) + Math.pow((missingColor.rgb.b - dmcColors[i].b), 2));

            if (d < distance) {
                distance = d;
                closestMatch[missingColor.hex.clean] = dmcColors[i];
            }
        }

    })

    console.log(closestMatch);

}

module.exports = {
    read: [generateScheme]
}