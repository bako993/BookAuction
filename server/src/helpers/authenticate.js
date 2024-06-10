import jwt from "jsonwebtoken";
import httpStatus from "http-status-codes";

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(httpStatus.UNAUTHORIZED).json({
        message: "Unauthorized. You don't have a token"
    })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(httpStatus.FORBIDDEN).json({
            message: "Forbidden. Please provide correct Token."
        })
        req.user = user
        next()
    })
}



