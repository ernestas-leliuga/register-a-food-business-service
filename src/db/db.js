const Sequelize = require("sequelize");
const { info } = require("winston");
const createEstablishment = require("./models/Establishment");
const {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASS,
  POSTGRES_USER
} = require("../config");

const connectionString = `postgres://${POSTGRES_USER}:${POSTGRES_PASS}@${POSTGRES_HOST}:5432/${POSTGRES_DB}?ssl=true`;

const db = new Sequelize(connectionString, {
  dialect: "postgres",
  dialectOptions: {
    ssl: true
  }
});

const Establishment = createEstablishment(db, Sequelize);

db.authenticate()
  .then(() => {
    info("Connection to postgres db has been established successfully.");
  })
  .catch(err => {
    info("Unable to connect to the database:", err);
  });

module.exports = { Establishment };
