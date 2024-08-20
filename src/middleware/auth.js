import jsonwebtoken from 'jsonwebtoken'

export const Auth = (req, res, next) => {
    const cookies = req.cookies
   
    if(!cookies.jwt) return res.status(401).send('Unauthorized')
    jsonwebtoken.verify(cookies.jwt, process.env.TOKEN_SECRET, (err, content) => {
        if(err) return res.status(403).json({ message: err })
        next()
    })
}