const { Sequelize } = require("sequelize");
const { Umzug, SequelizeStorage } = require("umzug");
const sequelize = new Sequelize(require("./config/config").development);

const umzug = new Umzug({
  migrations: { glob: "migrations/*.js" },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

const seederUmzug = new Umzug({
  migrations: { glob: "seeders/*.js" },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize, modelName: "SequelizeData" }),
  logger: console,
});

async function runMigrations() {
  try {
    await umzug.up();
    console.log("All migrations performed successfully");
  } catch (error) {
    console.error("Error performing migrations", error);
  }
}

async function runSeeders() {
  try {
    await seederUmzug.up();
    console.log("All seeders performed successfully");
  } catch (error) {
    console.error("Error performing seeders", error);
  }
}

module.exports = { umzug, runMigrations, runSeeders };
