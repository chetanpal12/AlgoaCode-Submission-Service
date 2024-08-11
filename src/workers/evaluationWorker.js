const { Worker } = require('bullmq');
const redisConnection = require('../config/redisConfig');
const axios = require('axios');

function evaluationWorker(queue) {
    new Worker('EvaluationQueue', async job => {
        if (job.name === 'EvaluationJob') {
            const submissionId=job.data.submissionId;
            console.log("evaluationjob",job.data);
            try {
                const updateDb= await axios.patch(`http://localhost:3000/api/v1/submissions/${submissionId}`,{
                    status:job.data.response.status
                });
                console.log("updateDb",updateDb.data);
                const response = await axios.post('http://localhost:3001/sendPayload', {
                    userId: job.data.userId,
                    payload: job.data
                })
                console.log("responce",response.data);
            } catch(error) {
                console.log(error)
            }
        }
    }, {
        connection: redisConnection
    });
}

module.exports = evaluationWorker;