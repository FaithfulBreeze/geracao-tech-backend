import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../services/databaseConnection.js'

export class User extends Model {}

User.init(
    {
        firstname: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'users'
    }
)