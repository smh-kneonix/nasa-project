const request = require("supertest");
const app = require("../../app");
const { mongoConnenct, mongoDisconnect } = require("../../services/mongo");
const { loadPlanetsData } = require("../../models/planets.model");

describe("launches API", function () {
  //conecct to mongoDB
  beforeAll(async function () {
    await mongoConnenct();
    await loadPlanetsData()
  },5000);
  //disconnect mongoDB
  afterAll(async function () {
    await mongoDisconnect();
  });

  describe("Test GET /launches", () => {
    test("It should respond with 200 success", async function () {
      const response = await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Test POST /launches", function () {
    const completeLaunchDete = {
      mission: "test mission",
      rocket: "rocket test",
      target: "Kepler-62 f",
      launchDate: "September 15,2030",
    };
    const dataWitoutDate = {
      mission: "test mission",
      rocket: "rocket test",
      target: "Kepler-62 f",
    };
    const launchDataInvalidDate = {
      mission: "test mission",
      rocket: "rocket test",
      target: "Kepler-62 f",
      launchDate: "increct",
    };

    test("it should response with 201 created", async function () {
      const response = await request(app)
        .post("/v1/launches")
        .send(completeLaunchDete)
        .expect("Content-Type", /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchDete.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(responseDate).toBe(requestDate);

      expect(response.body).toMatchObject(dataWitoutDate);
    });

    test("it should catch missing required properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(dataWitoutDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "bad request",
      });
    });
    test("it should catch invalid dates", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "invalid launch date",
      });
    });
  });
});
