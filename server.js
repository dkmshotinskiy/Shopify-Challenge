// Import express
const express = require('express')
const app = express()

// Import other necessary modules
const path = require('path')
const { Configuration, OpenAIApi } = require('openai')

// Load enviroment variables
require('dotenv').config()

// Prepare OpenAI
const configuration = new Configuration({
	apiKey: process.env.OPENAI_SECRET,
})
const openai = new OpenAIApi(configuration)

// Use middleware to convert body of the requests into json
app.use(express.json())

// Allow the .js and .css to be loaded from public directory
app.use(express.static(path.join(__dirname, 'public')))

// Load proper file for /Shopify-Challenge link
app.get('/Shopify-Challenge', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Request and return the response from OpenAI
app.post('/getPrompt', async (req, res) => {
	const response = await openai.createCompletion('text-curie-001', req.body)
	res.status(200).send(response.data.choices[0])
})

// Set server's port to 7000
app.listen(7000)