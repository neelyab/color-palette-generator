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
    return SavedPalettesService.getAllPalettes(knexInstance, user).then(
      (palettes) => {
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
          console.log(colorObj);

         return savedPalettes[p.palette_id].colors.push(colorObj);
        });
        for (const palette in savedPalettes) {
            paletteCollection.push(savedPalettes[palette]);
        }
        console.log(paletteCollection);

        return res.status(200).json(paletteCollection);
      }
    );
  });

// savedPalettesRouter
// .route('/:id')
// .all(requireAuth)
// .get(checkStitchIsSaved, (req, res) => {
//     const user_id = req.user
//     const stitch = req.stitch.id
//     SavedStitchesService.getStitchDetailsById(req.app.get('db'), user_id, stitch)
//     .then(stitch => {
//         res.status(200).json(stitch)
//     })
// })
// .post(checkStitchExists, (req, res) => {
//     // check if stitch exists in the embroidery_stitches table
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

// async function checkStitchIsSaved(req, res, next){
//     try {
//             const user_id = req.user.id
//             const {id} = req.params
//             const stitch = await SavedPalettesService.getStitchById(req.app.get('db'), user_id, id)
//         if(!stitch){
//             return res.status(404).json({error: 'Stitch not found'})
//         }
//         req.user = user_id
//         req.stitch = stitch
//         next()
//     }
//     catch(error){
//         next(error)
//     }

// }
// async function checkStitchExists(req, res, next){
//     try{
//         const {id} = req.params
//         const stitch = await StitchesService.getById(req.app.get('db'), id)
//         if(!stitch){
//             return res.status(404).json({error: 'Stitch not found, unable to save.'})
//         }
//         req.user = req.user.id
//         req.stitch = stitch
//         next()
//     }
//     catch(error){
//         next(error)
//     }
// }

module.exports = savedPalettesRouter;
