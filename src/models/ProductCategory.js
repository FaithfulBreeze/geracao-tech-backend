import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../services/databaseConnection.js'
import { Product } from './Product.js'
import { Category } from './Category.js'

export class ProductCategory extends Model {}

ProductCategory.init(
    {
        product_id:{
            type: DataTypes.INTEGER,
            references:{
                model: Product,
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        category_id:{
            type: DataTypes.INTEGER,
            references:{
                model: Category,
                key: 'id',
                
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    },
    {
        sequelize,
        tableName: 'product_category'
    }
)