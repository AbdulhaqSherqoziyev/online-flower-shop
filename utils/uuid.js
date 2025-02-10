const { v4: uuidv4 } = require('uuid');

const generateUUID = () => uuidv4();

module.exports = generateUUID;