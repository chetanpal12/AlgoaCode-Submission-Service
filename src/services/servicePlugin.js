const TestService = require('./testService');
const fastifyPlugin = require('fastify-plugin');
async function servicePlugin(fastify, options) {
    fastify.decorate('testService', new TestService());  // to add a new key value pair
}

module.exports = fastifyPlugin(servicePlugin);