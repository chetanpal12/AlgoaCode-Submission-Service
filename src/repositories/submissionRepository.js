const { createSubmission } = require('../controllers/submissionController');
const Submission = require('../models/submissionModel');

class SubmissionRepository {
    constructor() {
        this.submissionModel = Submission;
    }

    async createSubmission(submission) {
        try {
            // console.log("entering in the Repository");
            const response = await this.submissionModel.create(submission);
            // console.log("problem created in repository");
            return response; 
        } catch (error) {
            console.log("error in repository",error);
            throw error;
        }
        
    }
}

module.exports = SubmissionRepository;