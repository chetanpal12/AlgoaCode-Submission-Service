const { StatusCodes } = require("http-status-codes");
const BaseError = require("./baseError");

class SubmissionCreationError extends BaseError{
    constructor(details){
        super('Submission Creation Error',StatusCodes.BAD_REQUEST,`There is a problem while creating doing the Submission`,details);
    }
};

module.exports=SubmissionCreationError;