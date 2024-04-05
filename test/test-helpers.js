const bcrypt = require("bcryptjs");
// const jwt = require('jsonwebtoken')

function makeSavedPaletteColorsArray() {
  return [
    {
      user_id: 1,
      palette_name: "Fun Palette",
    },
    {
      user_id: 1,
      palette_name: "Dark Palette",
    },
    {
      user_id: 2,
      palette_name: "Whatever Palette",
    }
  ];
}
function makeSavedPalettesArray() {
  return [
    {
      color_id: 255,
      palette_id: 1
    },
    {
      color_id: 24,
      palette_id: 1
    },
    {
      color_id: 36,
      palette_id: 1
    },
    {
      color_id: 38,
      palette_id: 1
    },
    {
      color_id: 200,
      palette_id: 2
    },
    {
      color_id: 20,
      palette_id: 2
    },
    {
      color_id: 301,
      palette_id: 2
    },
    {
      color_id: 31,
      palette_id: 2
    },
    {
      color_id: 200,
      palette_id: 3
    },
    {
      color_id: 20,
      palette_id: 3
    },
    {
      color_id: 301,
      palette_id: 3
    },
    {
      color_id: 31,
      palette_id: 3
    },
  ];
}

function makeUsersArray() {
  return [
    {
      id: 1,
      username: "test-user-1",
      first_name: "Test user 1",
      user_password: "password",
    },
    {
      id: 2,
      username: "test-user-2",
      first_name: "Test user 2",
      user_password: "password",
    },
    {
      id: 3,
      username: "test-user-3",
      first_name: "Test user 3",
      user_password: "password",
    },
    {
      id: 4,
      username: "test-user-4",
      first_name: "Test user 4",
      user_password: "password",
    },
  ];
}
function seedUsers(db, users) {
  const preppedUsers = users.map((user) => ({
    ...user,
    user_password: bcrypt.hashSync(user.user_password, 1),
  }));
  return db.into("embroidery_users").insert(preppedUsers);
}
function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.username,
    algorithm: "HS256",
  });
  return `Bearer ${token}`;
}
function seedSavedPalettes(db, palettes) {
  return db.into("palettes").insert(palettes);
}
function seedSavedPaletteColors(db, colors) {
  return db.into("palette_colors").insert(colors);
}

module.exports = {
  makeUsersArray,
  seedUsers,
  seedSavedPalettes,
  seedSavedPaletteColors,
  makeAuthHeader,
  makeSavedPalettesArray,
  makeSavedPaletteColorsArray,
};
