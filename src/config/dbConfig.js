const mongoose = require('mongoose');
const { ATLAS_DB_URL, NODE_ENV } = require('./serverConfig');


async function connectToDB() {
    console.log("inside",NODE_ENV);
    try {
        if(NODE_ENV == "development") {
            console.log("inside the dbconfig started connection to db ");
            await mongoose.connect(ATLAS_DB_URL);
            console.log('connected to the db');
        }else{
            console.log("hi");
        }
    } catch(error) {
        console.log('Unable to connect to the DB server');
        console.log(error);
    }

}

module.exports = connectToDB;