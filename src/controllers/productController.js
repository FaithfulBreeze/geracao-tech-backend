import { Product } from '../models/Product.js'
import { Category } from '../models/Category.js' 
import { ProductCategory } from '../models/ProductCategory.js'
import { Image } from '../models/Image.js'
import { ProductOptions } from '../models/ProductOptions.js'
import { Op } from 'sequelize'

Product.belongsToMany(Category, {
    through: ProductCategory,
    foreignKey: 'product_id',
    otherKey: 'category_id',
    as: 'category_ids'
})

Product.hasMany(ProductCategory, {
    foreignKey: 'product_id'
})

Product.hasMany(Image, {
    foreignKey: 'product_id',
    as: 'images'
})

Product.hasMany(ProductOptions, {
    foreignKey: 'product_id',
    as: 'options'
})

export const createController = async (req, res) => {
    const { category_ids, images, options, ...body } = req.body
    try {
        let images_ids
        let options_ids
        if(images.length > 0){
            images_ids = images.map(async (image) => {
                const { id } = await Image.create(image)
                return id
            })
            images_ids = await Promise.all(images_ids)
        }
        
        if(options.length > 0){
            options_ids = options.map(async (option) => {
                option.values = option.values.join(',')
                const { id } = await ProductOptions.create(option)
                return id
            })
            options_ids = await Promise.all(options_ids)
        }

        const product = await Product.create(body, {
            include: [
                {
                    through: ProductCategory,
                    model: Category,
                    as: 'category_ids'
                },
                {
                    model: Image,
                    as: 'images'
                },
                {
                    model: ProductOptions,
                    as: 'options'
                }
            ]
        })
        product.setCategory_ids(category_ids)
        product.setImages(images_ids)
        product.setOptions(options_ids)
        res.status(201).json(product)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const readController = async (req, res) => {
    const { id } = req.params
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
        const findOptions = {
            limit: +limit == false ? 12 : limit < 0 ? null : +limit,
            [shouldSetPage]: (+limit||1)*(+page-1),
            [shouldSetFields]: fields,
            [shouldSetWhere]: {
                [Op.and]: filters
            },
            include: [
                {
                    model: Category,
                    as: 'category_ids',
                    through: {
                        model: ProductCategory,
                        attributes: [],
                        nested: false
                    },
                    attributes: ['id']
                },
                {
                    model: Image,
                    as: 'images',
                    attributes: ['id', 'path']
                },
                {
                    model: ProductOptions,
                    as: 'options'
                }
            ]
        }

        let data = await Product[id ? 'findByPk' : 'findAndCountAll'](id ? id : findOptions, id ? findOptions : null)
        if(!data) return res.status(404).json({ message: "Resource not found." })
        res.status(200).json({
            data: id ? data : data.rows, 
            total: data.count, 
            limit: limit == false ? 12 : +limit, 
            page: +page
        })
    } catch (error) {
        res.status(400).json(error)
    }
}

export const updateController = async (req, res) => {
    const { id } = req.params
    const { category_ids, images, options, ...body } = req.body

    try {
        let images_ids
        let options_ids
        if(images.length > 0){
            images_ids = images.map(async (image) => {
                const { id } = await Image.create(image)
                return id
            })
            images_ids = await Promise.all(images_ids)
        }
        
        if(options.length > 0){
            options_ids = options.map(async (option) => {
                option.values = option.values.join(',')
                const { id } = await ProductOptions.create(option)
                return id
            })
            options_ids = await Promise.all(options_ids)
        }

        let product = await Product.findByPk(id, {
            include: [
                {
                    model: Category,
                    as: 'category_ids',
                    through: {
                        model: ProductCategory,
                        attributes: [],
                        nested: false
                    },
                    attributes: ['id']
                },
                {
                    model: Image,
                    as: 'images',
                    attributes: ['id', 'path']
                },
                {
                    model: ProductOptions,
                    as: 'options'
                }
            ]
        })

        product.update(body)

        product.setCategory_ids(category_ids)
        product.setImages(images_ids)
        product.setOptions(options_ids)

        product.save()

        if(!product) return res.status(404).json({ message: "Resource not found." })

        res.status(204).end()
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

export const deleteController = async (req, res) => {
    try {
        const { id } = req.params
        const result = await Product.destroy({ where : {id} })
        if(!result) return res.status(404).json({ message: "Product not found." })
        res.status(204).end()
    } catch (error) {
        res.status(400).json(error)
    }
}