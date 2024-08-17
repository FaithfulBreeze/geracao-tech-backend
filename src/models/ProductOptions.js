import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../services/databaseConnection.js'
import { Product } from './Product.js'

export class ProductOptions extends Model {}

ProductOptions.init(
    {
        product_id:{
            type: DataTypes.INTEGER,
            references:{
                model: Product,
                key: 'id'
            }
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        shape:{
            type: DataTypes.ENUM('square', 'circle'),
            allowNull: false,
            defaultValue: 'square'
        },
        radius:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        type:{
            type: DataTypes.ENUM('text', 'color'),
            allowNull: false,
            defaultValue: 'text'
        },
        values:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'product_options'
    }
)