import jsonwebtoken from "jsonwebtoken";
import { User } from '../models/User.js'
import bcrypt from 'bcrypt'

export const getToken = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ where: {email}})
    const passwordMatch = bcrypt.compareSync(password, user.password)
    if(!passwordMatch) return res.status(401).json({ message: "Wrong password." })
    const token = jsonwebtoken.sign(
        { payload: user.id },
        process.env.TOKEN_SECRET,
        { expiresIn: '24h' }
    )
    res.cookie(
        'jwt',
        token,
        {
          httpOnly: true,
          maxAge: 24000 * 60 * 60
        }
    )
    res.status(200).json({ token })
}
