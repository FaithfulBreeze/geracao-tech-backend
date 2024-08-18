import { Product } from '../models/Product.js'
import { Category } from '../models/Category.js' 
import { ProductCategory } from '../models/ProductCategory.js'
import { Op } from 'sequelize'

Product.hasMany(Category, {
    foreignKey: 'product_id',
    as: 'category_id'
})

export const createController = async (req, res) => {
    const { category_ids, ...body } = req
    try {
        const product = await Product.create(body)
        product.setCategory(category_ids)
        res.status(201).json(product)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const readController = async (req, res) => {
    
    if(!req.params.id){
        const { 
            limit = 0, 
            page = 1, 
            fields, 
            match,
            category_ids
        } = req.query

        const price_range = req.query['price-range']
        const option = req.query['option[45]']

        let shouldSetPage = ''
        let shouldSetFields = ''
        let shouldSetWhere = ''

        if(fields){
            shouldSetFields = 'attributes'
            fields = fields.split(',')
        }
        if(page > 1) shouldSetPage = 'offset'
        if(match, category_ids, price_range, option) shouldSetWhere = 'where'

        const filters = []

        if(match) filters.push({
            [Op.or]: [
                { name:{[Op.substring]: match} }, 
                { description:{[Op.substring]: match} }
            ]
        })

        if(category_ids) filters.push({
            id: {
                [Op.in]: category_ids.split(',')
            }
        })

        if(price_range) filters.push({
            price: {
                [Op.and]: [
                    {
                        [Op.lt]: price_range.split('-')[1]
                    },
                    {
                        [Op.gt]: price_range.split('-')[0]
                    }
                ]
            }
        })

        if(option) filters.push({
            values: {
                [Op.in]: option.split(',')
            }
        })

        try {
            let data = await Product.findAndCountAll({
                limit: +limit == false ? 12 : +limit,
                [shouldSetPage]: (+limit||1)*(+page-1),
                [shouldSetFields]: fields,
                [shouldSetWhere]: {
                    [Op.and]: filters
                },
                include: {
                    model: Category,
                    as: 'category_ids'
                }
            })

            res.status(200).json({
                data: data.rows, 
                total: data.count, 
                limit: limit == false ? 12 : +limit, 
                page: +page
            })
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }else{
        try {
            const product = await Product.findByPk(req.params.id, {
                attributes: ['id', 'name', 'slug', 'use_in_menu']
            })
            if(!product) return res.status(404).json({ message: "Product not found." })
            res.status(200).json(product)
        } catch (error) {
            res.status(400).json(error)
        }
    }
}

export const updateController = async (req, res) => {

}

export const deleteController = async (req, res) => {

}