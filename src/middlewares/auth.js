const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'secretkey');
        next()
    } catch (error) {
        res.send({message:'Invalid Token'})
    }
}

module.exports = auth