const establishment = (db, Sequelize) => {
  return db.define("establishment", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    establishment_trading_name: { type: Sequelize.STRING },
    establishment_opening_date: { type: Sequelize.STRING },
    declaration1: { type: Sequelize.STRING },
    declaration2: { type: Sequelize.STRING },
    declaration3: { type: Sequelize.STRING }
  });
};

module.exports = { establishment };
