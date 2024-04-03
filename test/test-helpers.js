const bcrypt = require("bcryptjs");
// const jwt = require('jsonwebtoken')

function makeStitchesArray() {
  return [
    {
      id: 1,
      stitch_name: "back stitch",
      image_url: "www.google.com",
      stitch_description: "instructions to make the stitch",
    },
    {
      id: 2,
      stitch_name: "stem stitch",
      image_url: "www.embroiderywebsite",
      stitch_description: "instructions to make the stitch",
    },
    {
      id: 3,
      stitch_name: "french knot",
      image_url: "www.google.com",
      stitch_description: "instructions to make the stitch",
    },
  ];
}
function makeSavedStitchesArray() {
  return [
    {
      user_id: 1,
      id: 1,
    },
    {
      user_id: 1,
      id: 2,
    },
  ];
}
function makeSavedProjectsArray() {
  return [
    {
      user_id: 1,
      id: 1,
    },
    {
      user_id: 1,
      id: 2,
    },
  ];
}

function makeProjectsArray() {
  return [
    {
      id: 1,
      project_name: "lemon citrus",
      image_url: "www.imageurl.com",
      project_description: "description of the project",
      project_url: "www.projecturl.com",
      stitches: "back stitch, stem stitch, chain stitch",
    },
    {
      id: 2,
      project_name: "rainbow pattern",
      image_url: "www.imageurl.com",
      project_description: "description of the project",
      project_url: "www.projecturl.com",
      stitches: "french knot, stem stitch, chain stitch",
    },
    {
      id: 3,
      project_name: "clover flower",
      image_url: "www.imageurl.com",
      project_description: "description of the project",
      project_url: "www.projecturl.com",
      stitches: "satin stitch, bullion knot",
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
      date_created: "2029-01-22T16:28:32.615Z",
    },
    {
      id: 2,
      username: "test-user-2",
      first_name: "Test user 2",
      user_password: "password",
      date_created: "2029-01-22T16:28:32.615Z",
    },
    {
      id: 3,
      username: "test-user-3",
      first_name: "Test user 3",
      user_password: "password",
      date_created: "2029-01-22T16:28:32.615Z",
    },
    {
      id: 4,
      username: "test-user-4",
      first_name: "Test user 4",
      user_password: "password",
      date_created: "2029-01-22T16:28:32.615Z",
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
function seedSavedStitches(db, stitches) {
  return db.into("saved_stitches").insert(stitches);
}
function seedEmbroideryStitches(db, stitches) {
  return db.into("embroidery_stitches").insert(stitches);
}
function seedSavedProjects(db, projects) {
  return db.into("saved_projects").insert(projects);
}
function seedEmbroideryProjects(db, projects) {
  return db.into("embroidery_projects").insert(projects);
}

module.exports = {
  makeProjectsArray,
  makeStitchesArray,
  makeUsersArray,
  seedUsers,
  seedSavedStitches,
  seedSavedProjects,
  seedEmbroideryStitches,
  seedEmbroideryProjects,
  makeAuthHeader,
  makeSavedStitchesArray,
  makeSavedProjectsArray,
};
