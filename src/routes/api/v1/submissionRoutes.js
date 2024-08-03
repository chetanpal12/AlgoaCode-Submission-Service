const { submissionController } = require("../../../controllers");

async function submissionRoutes(fastify, options) {
    fastify.post('/', submissionController.createSubmission);
    fastify.get('/',submissionController.pingRequest);
}

module.exports = submissionRoutes;