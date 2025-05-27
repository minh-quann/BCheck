import { Sequelize } from "sequelize";

const sequelize = new Sequelize('bcheck', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

export default sequelize;
