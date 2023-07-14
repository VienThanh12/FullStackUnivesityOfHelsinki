require('dotenv').config()

//const PORT = process.env.PORT || 3001
const PORT = 3001
const MONGODB_URI = process.env.MONGODB_URI

//const MONGODB_URI = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI

module.exports = {
    MONGODB_URI,
    PORT
}