// const asyncHandler = ()=>{

// }




// const asyncHandler = (fn) => async (req,res,next) => {
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//        res.status(500).json({
//         success:false,
//         message:error.message || "Internal Server Error"
//        });
//     }
// }


const asyncHandler = (requestHandler) => {
    return async (req, res, next) => {
        new Promise((resolve) => resolve(requestHandler(req, res, next)))
            .catch((error) => {
                console.error("Error in async handler:", error);
                res.status(500).json({
                    success: false,
                    message: error.message || "Internal Server Error",
                });
            });
    };
};
            

export {asyncHandler};
