const express = require("express");
const requireAuth = require("../middleware/jwt-auth");
const SavedPalettesService = require("./saved-palettes.service");
const ThreadColorsService = require("../threadColors/threadColors.service");
const savedPalettesRouter = express.Router();
const knexInstance = require("../db/connection");
const xss = require("xss");

savedPalettesRouter
  .route("/")
  .all(requireAuth)
  .get((req, res) => {
    const user = req.user.id;
    return SavedPalettesService.getAllPalettes(knexInstance, user).then((p) => {
      let palettes = formatPalettes(p);
      return res.status(200).json(palettes);
    });
  })
  .post((req, res) => {
    const user_id = req.user.id;
    const paletteInfo = req.body;

    if (
      !paletteInfo ||
      !paletteInfo.palette_name ||
      !paletteInfo.colors ||
      paletteInfo.colors.length < 1
    ) {
      return res.status(400).json("Missing name or colors.");
    }
    const savedPalette = {
      palette_name: xss(paletteInfo.palette_name),
      user_id: user_id,
    };
    SavedPalettesService.savePalette(knexInstance, savedPalette).then(
      (palette) => {
        let colorsToSave = paletteInfo.colors.map((color) => {
          return {
            color_id: xss(color),
            palette_id: palette[0].palette_id,
          };
        });
        SavedPalettesService.saveColors(knexInstance, colorsToSave).then(() => {
          return res.status(201).send(`Palette saved.`);
        });
      }
    );
  });

savedPalettesRouter
  .route("/:id")
  .all(requireAuth)
  .get((req, res) => {
    const user_id = req.user.id;
    const { id } = req.params;

    SavedPalettesService.getPaletteById(knexInstance, user_id, id).then((p) => {
      if (p.length < 1) {
        return res.status(401).json("Palette not found.");
      }

      let palette = formatPalettes(p);
      return res.status(200).json(palette);
    });
  })
  .delete((req, res) => {
    const user_id = req.user.id;
    const id = req.params.id;
    SavedPalettesService.deletePalette(knexInstance, user_id, id).then(() => {
      return res.status(200).send(`Palette with id: ${id} deleted.`);
    });
  });

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
      colorId: p.color_id,
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
