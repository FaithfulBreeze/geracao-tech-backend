import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../services/databaseConnection.js'
import { Product } from './Product.js'

export class Image extends Model {}

Image.init(
    {
        product_id:{
            type: DataTypes.INTEGER,
            references:{
                model: Product,
                key: 'id'
            }
        },
        enabled:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        path:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'images'
    }
)