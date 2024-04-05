const threadColorsService = require("../threadColors/threadColors.service");

async function getColors() {
  const data = await threadColorsService.getAllColors();
  return data;
}

function formatString(str) {
  return str.replaceAll(" ", "").toLowerCase();
}

async function generateScheme(req, res, next) {
  const colorCode = req.query.colorCode;
  const mode = req.query.mode;
  const count = req.query.count;

  if (!colorCode) {
    return res
      .status(400)
      .json({ message: "Please provide the colorCode in your request." });
  }

  const code = formatString(colorCode);
  const dmcColors = await getColors();

  const colorProfile = dmcColors.find((color) => {
    color = formatString(color.color_code);
    return color == code;
  });

  if (!colorProfile || colorProfile.length < 1) {
    return res
      .status(400)
      .json({ message: "Please provide a valid color code." });
  }

  let validModes = [
    "monochrome",
    "monochrome-dark",
    "monochrome-light",
    "analogic",
    "complement",
    "analogic-complement",
    "triad",
    "quad",
  ];
  if (mode && !validModes.includes(mode.toLowerCase())) {
    return res
      .status(400)
      .json({ message: "Please provide a valid color mode." });
  }

  const query = {
    hexCode: colorProfile.hex_code,
    mode: mode,
    count: count,
  };
  const colorSchemeQuery = formQueryString(query);

  return fetchResults(dmcColors, colorSchemeQuery, res);
}

function formQueryString(query) {
  let queryString = `?hex=${query.hexCode}`;
  query.mode ? (queryString += `&mode=${query.mode}`) : null;
  query.count ? (queryString += `&count=${query.count}`) : null;
  return queryString;
}

async function fetchResults(dmcColors, apiQuery, res) {
  const response = await fetch(
    `https://www.thecolorapi.com/scheme${apiQuery}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    }
  )
    .then((response) => response.text())
    .then((data) => checkDmcColors(JSON.parse(data), dmcColors))
    .then((results) => res.status(200).json({ results }))
    .catch((e) =>
      res
        .status(400)
        .json({ message: "Something went wrong, please try again." })
    );
}

function checkDmcColors(results, dmcColors) {
  let foundColors = [];
  let missingColors = [];

  results.colors.forEach((color) => {
    let colorProfile = dmcColors.find(
      (dmcColor) =>
        dmcColor.hex_code.toLowerCase() == color.hex.clean.toLowerCase()
    );
    if (colorProfile) {
      foundColors.push(colorProfile);
    }
    missingColors.push(color);
  });

  if (missingColors.length > 0) {
    let similarColors = findSimilarColors(missingColors, dmcColors);
    foundColors = new Set(foundColors.concat(similarColors));

    return Array.from(foundColors);
  }

  return foundColors;
}

function findSimilarColors(missingColors, dmcColors) {
  let closestMatch = {};
  let finalList = [];

  missingColors.forEach((missingColor) => {
    let distance = 442;

    for (let i = 0; i < dmcColors.length; i++) {
      let d = Math.sqrt(
        Math.pow(missingColor.rgb.r - parseInt(dmcColors[i].r), 2) +
          Math.pow(missingColor.rgb.g - parseInt(dmcColors[i].g), 2) +
          Math.pow(missingColor.rgb.b - parseInt(dmcColors[i].b), 2)
      );

      if (d < distance && !Object.values(closestMatch).includes(dmcColors[i])) {
        distance = d;
        closestMatch[missingColor.hex.clean.toLowerCase()] = dmcColors[i];
      }
    }
  });

  for (let i = 0; i < missingColors.length; i++) {
    finalList.push(closestMatch[missingColors[i].hex.clean.toLowerCase()]);
  }

  return finalList;
}

module.exports = {
  read: [generateScheme],
};
