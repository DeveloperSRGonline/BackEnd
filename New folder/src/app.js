
const express = require('express')

const app = express()
app.use(express.json())
/**
 * Middleware to parse incoming JSON requests.
 * This middleware is used between the Express app and route handlers
 * to automatically parse JSON payloads in the request body.
 */


module.exports = app;