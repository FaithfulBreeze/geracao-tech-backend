import { User } from '../models/User.js'

export const createController = async (req, res) => {
    const { body } = req
    if(body.password == body.confirmPassword){
        delete body.confirmPassword
        try {
            const user = await User.create(body)
            res.status(201).json(user)
        } catch (error) {
            res.status(400).json(error)
        }
    }else{
        res.status(400).json({ message: "Passwords does not match."} )
    }
}

export const readController = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByPk(id)
        if(!user) return res.status(404).json({ message: "User not found." })
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json(error)
    }
}

export const updateController = async (req, res) => {
    try {
        const { id } = req.params
        const { body } = req
        if(Object.keys(body).length == 0) return res.status(400).json({ message: "No body content."} )
        const user = await User.update(body, { where: {id} })
        if(user[0] == 0) return res.status(404).json({ message: "User not found." })
        res.status(204).end()
    } catch (error) {
        res.status(400).json(error)
    }
}

export const deleteController = async (req, res) => {
    try {
        const { id } = req.params
        const result = await User.destroy({ where : {id} })
        if(!result) return res.status(404).json({ message: "User not found." })
        res.status(204).end()
    } catch (error) {
        res.status(400).json(error)
    }
}