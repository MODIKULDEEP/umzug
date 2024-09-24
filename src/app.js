const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const { sequelize } = require("../models");
const { runMigrations, runSeeders } = require("../umzug");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/users", userRoutes);

sequelize
  .authenticate()
  .then(async () => {
    console.log("Connection has been established successfully.");
    await runMigrations(); // Run migrations on startup
    await runSeeders(); // Run seeders after migrations
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = app;