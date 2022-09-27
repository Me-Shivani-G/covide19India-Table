const express = require("express");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const path = require("path");
const dbPath = path.join(__dirname, "covid19India.db");
app.use(express.json());
let db = null;
const initializeDbAndServer = async () => {
  try {
    database = await open({ filename: dbPath, driver: sqlite3.Database });
    app.listen(3000, () => {
      console.log("Server Is running on http://localhost:3000");
    });
  } catch (error) {
    console.log(`Data base Error is ${error}`);
    process.exit(1);
  }
};
initializeDbAndServer();
const convertDbObject = (objectItem) => {
  return {
    state_id: objectItem.state_id,
    state_name: objectItem.state_name,
    population: objectItem.population,
  };
};
app.get("/states/", async (request, response) => {
  const getStatesQuery = `
    select * 
    from state 
    `;
  const getStateQueryResponse = await db.all(getStatesQuery);
  response.send(
    getStateQueryResponse.map((eachState) => convertDbObject(eatState))
  );
});
