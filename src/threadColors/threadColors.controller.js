const colorsService = require("./threadColors.service");

function colorByDMCCode(req, res, next) {
  colorsService
    .getColorByDMCCode(req.params.id)
    .then((color) => {
      if (color.length > 0) {
        return res.json({ color });
      }
      next({ status: 404, message: `Color cannot be found.` });
    })
    .catch(next);
}

function list(req, res, next) {
  colorsService
    .getAllColors()
    .then((data) => res.json({ data }))
    .catch(next);
}

module.exports = {
  read: [colorByDMCCode],
  list,
};
