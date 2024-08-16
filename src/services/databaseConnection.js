import { Sequelize } from "sequelize";
import { config } from '../config/databaseConfig.js'
export const sequelize = new Sequelize(config)