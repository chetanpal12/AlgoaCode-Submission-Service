const SubmissionCreationError = require('../errors/submissionCreationError');
const SubmissionProducer = require('../producers/submissionQueueProducer');

class SubmissionService {

    constructor(submissionRepository) {
        // inject here
        this.submissionRepository = submissionRepository;
    }

    async pingCheck() {
        return 'pong'
    }

    async addSubmission(submissionPayload) {
        try {
            // console.log("entering in the Service");
            const submission = await this.submissionRepository.createSubmission(submissionPayload);
            if(!submission) {
                // TODO: Add error handling here
                // throw {messgae: "Not able to create submission"};
                throw new SubmissionCreationError('submission not happen !!!!!!!!!!!');
            }
            // console.log(submission);
            const response = await SubmissionProducer(submission);
            // console.log("Returning responce from service");
            return {queueResponse: response, submission};
        } catch (error) {
            console.log("error in service",error);
            // if (error.name === 'ValidationError') {
            //     const validationErrors = Object.values(error.errors).map((err) => {
            //         console.log('hey !!',err.message);
            //         return err.message
            //     });
            //     console.log("validation error",validationErrors);
            //     console.log('hey we got it ',error.errors);
            // }
            throw error;
        }
    }

}

module.exports = SubmissionService