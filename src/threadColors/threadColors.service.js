// const dmcColors = require("../data/dmcColors");
const knexInstance = require("../db/connection");

function getAllColors() {
  return knexInstance.from("dmc_colors").select("*");
}

function getColorByDMCCode(id) {
  return knexInstance.from("dmc_colors").select("*").where({ color_code: id });
}

module.exports = {
  getAllColors,
  getColorByDMCCode,
};
