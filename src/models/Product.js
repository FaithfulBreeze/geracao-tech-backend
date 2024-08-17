import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../services/databaseConnection.js'

export class Product extends Model {}

Product.init(
    {
        enabled:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
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
            allowNull: false,
            defaultValue: 0
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        price: {
            type: DataTypes.FLOAT(5, 2),
            allowNull: false
        },
        price_with_discount: {
            type: DataTypes.FLOAT(5, 2),
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'products'
    }
)