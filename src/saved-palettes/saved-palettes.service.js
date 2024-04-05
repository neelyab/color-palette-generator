const SavedPalettesService = {
  getAllPalettes(db, user_id) {
    return db("palettes")
      .select(
        "palette_name",
        "user_id",
        "pc.palette_id",
        "dc.color_id",
        "color_name",
        "dc.color_id",
        "color_code",
        "r",
        "g",
        "b",
        "hex_code"
      )
      .innerJoin("palette_colors AS pc", "pc.palette_id", "palettes.palette_id")
      .leftJoin("dmc_colors AS dc", "pc.color_id", "dc.color_id")
      .where("palettes.user_id", user_id);
  },
  savePalette(db, palette) {
    return db.into("palettes").insert(palette).returning("palette_id");
  },
  saveColors(db, color) {
    return db.into("palette_colors").insert(color);
  },
  getPaletteById(db, user_id, id) {
    return db
      .select(
        "palette_name",
        "user_id",
        "pc.palette_id",
        "dc.color_id",
        "color_name",
        "color_code",
        "r",
        "g",
        "b",
        "hex_code"
      )
      .innerJoin("palette_colors AS pc", "pc.palette_id", "palettes.palette_id")
      .leftJoin("dmc_colors AS dc", "pc.color_id", "dc.color_id")
      .from("palettes")
      .where("user_id", user_id)
      .andWhere("pc.palette_id", id);
  },
  deletePalette(db, user_id, palette) {
    return db
      .select("*")
      .from("palettes")
      .where("user_id", user_id)
      .andWhere("palette_id", palette)
      .del();
  },
};

module.exports = SavedPalettesService;
