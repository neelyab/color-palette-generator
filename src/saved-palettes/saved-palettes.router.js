const express = require("express");
const requireAuth = require("../middleware/jwt-auth");
const SavedPalettesService = require("./saved-palettes.service");
const ThreadColorsService = require("../threadColors/threadColors.service");
const savedPalettesRouter = express.Router();
const knexInstance = require("../db/connection");

savedPalettesRouter
  .route("/")
  .all(requireAuth)
  .get((req, res) => {
    const user = req.user.id;
    return SavedPalettesService.getAllPalettes(knexInstance, user).then((p) => {
      let palettes = formatPalettes(p);
      return res.status(200).json(palettes);
    });
  });

savedPalettesRouter
  .route("/:id")
  .all(requireAuth)
  .get((req, res) => {
    const user_id = req.user.id;
    const { id } = req.params;

    SavedPalettesService.getPaletteById(knexInstance, user_id, id).then((p) => {
      if (p.length < 1) {
        return res.status(401).json("color not found");
      }

      let palette = formatPalettes(p);
      return res.status(200).json(palette);
    });
  });
// .post((req, res) => {
//     const user_id = req.user
//     const {id} = req.params
//     const savedStitch = {
//         user_id,
//         id
//     }
//     SavedStitchesService.saveStitch(req.app.get('db'), savedStitch)
//     .then(() => {
//         return res.status(201).send(`Stitch with id: ${id} saved`)
//     })
// })
// .delete(checkStitchIsSaved, (req, res) => {
//     // check if stitch is saved before deleting it
//     const user_id = req.user
//     const id = req.stitch.id
//     SavedStitchesService.deleteStitch(req.app.get('db'), user_id, id)
//     .then(()=>{
//         return res.status(200).send(`Stitch with id: ${id} deleted`)
//     })
// })


function formatPalettes(palettes) {
  if (!palettes) {
    return;
  }
  let savedPalettes = {};
  let paletteCollection = [];

  palettes.forEach((p) => {
    if (!savedPalettes[p.palette_id]) {
      savedPalettes[p.palette_id] = {
        name: p.palette_name,
        colors: [],
      };
    }

    let colorObj = {
      name: p.color_name,
      colorCode: p.color_code,
      r: p.r,
      g: p.g,
      b: p.b,
      hexCode: p.hex_code,
    };

    return savedPalettes[p.palette_id].colors.push(colorObj);
  });

  for (const palette in savedPalettes) {
    paletteCollection.push(savedPalettes[palette]);
  }

  return paletteCollection;
}

module.exports = savedPalettesRouter;
