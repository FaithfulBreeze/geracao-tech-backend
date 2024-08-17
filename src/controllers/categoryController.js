import { Category } from '../models/Category.js'

export const createController = async (req, res) => {
    const { body } = req
    try {
        const category = await Category.create(body)
        res.status(201).json(category)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const readController = async (req, res) => {
    if(!req.params.id){
        const { limit = 0, page = 1, fields, use_in_menu } = req.query
        let shouldSetPage = ''
        let shouldSetWhere = ''
        if(page > 1) shouldSetPage = 'offset'
        if(use_in_menu == 'true') shouldSetWhere = 'where'
        try {
            const data = await Category.findAndCountAll({
                limit: +limit == false ? 12 : +limit,
                [shouldSetPage]: (+limit||1)*(+page-1),
                attributes: fields ? fields.split(',') : ['id', 'name', 'slug', 'use_in_menu'],
                [shouldSetWhere]: { use_in_menu: true }
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
    try {
        const { id } = req.params
        const { body } = req
        if(Object.keys(body).length == 0) return res.status(400).json({ message: "No body content."} )
        const category = await Category.update(body, { where: {id} })
        if(category[0] == 0) return res.status(404).json({ message: "Category not found." })
        res.status(204).end()
    } catch (error) {
        res.status(400).json(error)
    }
}

export const deleteController = async (req, res) => {
    try {
        const { id } = req.params
        const result = await Category.destroy({ where : {id} })
        if(!result) return res.status(404).json({ message: "Category not found." })
        res.status(204).end()
    } catch (error) {
        res.status(400).json(error)
    }
}