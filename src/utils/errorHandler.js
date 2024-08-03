const { StatusCodes } = require("http-status-codes");
const BaseError = require("../errors/baseError");

function errorHandler(error, request, reply){
    if(error instanceof BaseError){
        return reply.status(error.statusCode).send({
            success:false,
            message:error.description,
            error:error.details,
            data:{}
        });
    }else {
        reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: "something went wrong!",
            error: error.message || error, // Ensure `error.message` is used if available
            data: {} // Because this is an exception so no data is going to be provided.
        });
    }
}

module.exports=errorHandler;