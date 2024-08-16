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
        res.status(400).json({ message: "Passwords does not match."})
    }
}

export const readController = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findAll({ where: {id}})
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json(error)
    }
}