async function pingRequest(req, res) {

    console.log("inside controller",this.testService);

    const response = await this.submissionService.pingCheck();
    return res.send({data: response});
}

// TODO: Add validastion layer
async function createSubmission(req, res) {
    try {
        console.log("entering in the controller",this.submissionService);
        const response = await this.submissionService.addSubmission(req.body);
        console.log("Returning responce from controller");
        return res.status(201).send({
            error: {},
            data: response,
            success: true,
            message: 'Created submission successfully'
        })
    } catch (error) {
        console.log("error in controller",error);
        throw error;
    }
    

}

async function updateSubmission(req, res) {
    try {
        console.log("entering in the controller while updatingdb",this.submissionService);
        const updateProblem=await this.submissionService.updateSubmission(req.params.id,req.body);
        console.log("Returning responce from controller");
        return res.status(201).send({
            error: {},
            data: updateProblem,
            success: true,
            message: 'Updated submission successfully'
        })
    } catch (error) {
        console.log("error in controller",error);
        throw error;
    }
    

}

module.exports =  {
    pingRequest,
    createSubmission,
    updateSubmission
};