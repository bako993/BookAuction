import httpStatus from "http-status-codes";
export function checkIsAdmin(req, res, next) {
    if (Boolean(req.user.isAdmin)) {
        next()
    } else {
        return res.status(httpStatus.FORBIDDEN).json({
            message: "Forbidden. You must be an administrator to access this route."
        })
    }
}
