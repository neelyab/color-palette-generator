const app = require("../src/app");
const helpers = require("./test-helpers");
const knex = require("knex");

describe("GET Color Generator endpoints", () => {
  let db;
  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });
  after("destroy connection", () => db.destroy());
  before("clean table", () => {
    return db.raw(
      "TRUNCATE embroidery_users, palettes, palette_colors, dmc_colors RESTART IDENTITY CASCADE"
    );
  });
  beforeEach("seed users", () => {
    const usersArray = helpers.makeUsersArray();
    return helpers.seedUsers(db, usersArray);
  });
  beforeEach("seed colors", () => {
    const colors = helpers.makeDMCColorsArray();
    return helpers.seedDMCColors(db, colors);
  });
  afterEach("clean table", () => {
    return db.raw(
      "TRUNCATE embroidery_users, palettes, palette_colors, dmc_colors RESTART IDENTITY CASCADE"
    );
  });
  context("GET Color Palette", () => {
    const usersArray = helpers.makeUsersArray();
    const expectedResponse = {
      results: [
        {
          b: "14",
          color_code: "680",
          color_id: 312,
          color_name: "Old Gold Dark",
          g: "141",
          hex_code: "bc8d0e",
          r: "188",
        },
        {
          b: "21",
          color_code: "972",
          color_id: 326,
          color_name: "Canary Deep",
          g: "181",
          hex_code: "ffb515",
          r: "255",
        },
        {
          b: "64",
          color_code: "725",
          color_id: 325,
          color_name: "Topaz Med Lt",
          g: "200",
          hex_code: "ffc840",
          r: "255",
        },
        {
          b: "118",
          color_code: "743",
          color_id: 329,
          color_name: "Yellow Med",
          g: "211",
          hex_code: "fed376",
          r: "254",
        },
      ],
    };
    it("returns an array of color palettes ", () => {
      let colorRequest = {
        mode: "monochrome",
        count: "4",
        colorCode: "725",
      };
      return supertest(app)
        .get("/color-palette")
        .set("Authorization", helpers.makeAuthHeader(usersArray[0]))
        .query(colorRequest)
        .expect(200, expectedResponse);
    });
    it("returns a 400 bad request when params are missing ", () => {
      let badRequest = {
        count: "4",
      };
      return supertest(app)
        .get("/color-palette")
        .set("Authorization", helpers.makeAuthHeader(usersArray[3]))
        .query(badRequest)
        .expect(400);
    });
  });
});
