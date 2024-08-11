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

    async updateSubmission(problemId,dataToupdate){
        try {
            console.log("problem id ",problemId);
            const filter={_id:problemId};
            const response=await this.submissionModel.findByIdAndUpdate(filter,dataToupdate,{new:true});
            // console.log("responce from repositoryyyyy",response);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
       
    }
}

module.exports = SubmissionRepository;