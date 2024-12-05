const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch(error => next(error))
    }
}
// try{
//     await requestHandler(req,res,next)
// }
// catch(error){
//     res.status(error.code || 500).json({message: error.message || "Server error", success : false} )
// }

export { asyncHandler }