import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../services/databaseConnection.js'

export class Category extends Model {}

Category.init(
    {
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        slug: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        use_in_menu: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 0
        },
    },
    {
        sequelize,
        tableName: 'categories'
    }
)