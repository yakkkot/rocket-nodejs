const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/rocketProject';

module.exports = {
    PORT,
    MONGO_URL,
};