const { fetchProblemDetails } = require('../apis/problemAdminApi');
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
            console.log("entering in the Service",submissionPayload);
            const problemId = submissionPayload.problemId;
            const userId=submissionPayload.userId;

            const problemAdminApiResponse = await fetchProblemDetails(problemId);
            console.log('problem fetched successfully',problemAdminApiResponse.data.codeStubs);
            if(!problemAdminApiResponse) {
                throw new SubmissionCreationError('Failed to create a submission in the repository');
            }
    
            const languageCodeStub = problemAdminApiResponse.data.codeStubs.find(codeStub => codeStub.language.toLowerCase() === submissionPayload.language.toLowerCase());
    
            console.log("language stub",languageCodeStub) 
    
            // submissionPayload.code = languageCodeStub.startSnippet + "\n\n" + submissionPayload.code + "\n\n" + languageCodeStub.endSnippet;
            submissionPayload.code = languageCodeStub.startSnippet + "\n\n" + languageCodeStub.userSnippet + "\n\n" + languageCodeStub.endSnippet;
            // return true;
            const submission = await this.submissionRepository.createSubmission(submissionPayload);
            if(!submission) {
                // TODO: Add error handling here
                // throw {messgae: "Not able to create submission"};
                throw new SubmissionCreationError('submission not happen !!!!!!!!!!!');
            }
            console.log("submission",submission);
            const response = await SubmissionProducer({
                [submission._id]: {
                    code: submission.code,
                    language: submission.language,
                    inputCase: problemAdminApiResponse.data.testCases[0].input,
                    outputCase: problemAdminApiResponse.data.testCases[0].output,
                    userId,
                    submissionId:submission._id
                }
            });
            // console.log("Returning responce from service",responce);
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

    
    async updateSubmission(problemId,dataToUpadate){
        try {
            console.log("data from service for update",dataToUpadate,problemId)
            const updatesubmission=await this.submissionRepository.updateSubmission(problemId,dataToUpadate);
            return updatesubmission;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = SubmissionService