import { Product } from '../models/Product.js'

export const createController = async (req, res) => {

}

export const readController = async (req, res) => {
    if(!req.params.id){
        const { limit = 0, page = 1, fields, match } = req.query
        let shouldSetPage = ''
        let shouldSetWhere = ''
        if(page > 1) shouldSetPage = 'offset'
        if(match) shouldSetWhere = 'where'
        try {
            const data = await Category.findAndCountAll({
                limit: +limit == false ? 12 : +limit,
                [shouldSetPage]: (+limit||1)*(+page-1),
                attributes: fields ? fields.split(',') : ['id', 'name', 'slug', 'use_in_menu'],
                [shouldSetWhere]: { name: true },

            })
            res.status(200).json({
                data: data.rows, 
                total: data.count, 
                limit: limit == false ? 12 : +limit, 
                page: +page
            })
        } catch (error) {
            res.status(400).json(error)
        }
    }else{
        try {
            const category = await Category.findByPk(req.params.id, {
                attributes: ['id', 'name', 'slug', 'use_in_menu']
            })
            if(!category) return res.status(404).json({ message: "Category not found." })
            res.status(200).json(category)
        } catch (error) {
            res.status(400).json(error)
        }
    }
}

export const updateController = async (req, res) => {

}

export const deleteController = async (req, res) => {

}