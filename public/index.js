// Set elements to varibles
const mainEl = document.querySelector('main')
const textareaEl = document.querySelector('textarea')
const buttonEl = document.querySelector('button')
const h2El = document.querySelector('h2')
const noResEl = document.querySelector('#no-responses')
const templateEl = document.querySelector('template#response')

// Array of stored responses
const storedRes = []

// Function to retrieve data from local storage
const getResponses = () => {
	// Get responses from local storage
	const strRes = localStorage.getItem('responses')

	// Add responses to storedRes variable
	try {
		const arrayRes = JSON.parse(strRes)

		if (arrayRes instanceof Array) {
			storedRes.push(...arrayRes)
		}
	} catch {}

	// Add responses to DOM
	for (const { prompt, res } of storedRes) {
		addDOMRes(prompt, res, true)
	}
}

// Check if the DOM is loaded or not
if (document.readyState !== 'loading') {
	// The page is loaded, run getResponses function
	getResponses()
} else {
	// Set the event listener to wait
	// until the page finished loading to run getResponses function
	document.addEventListener('DOMContentLoaded', getResponses)
}

// Function to prepare request for OpenAI
const prepareRequest = e => {
	// Prevent form from submitting and reloading the page
	e.preventDefault()

	// Set the prompt to variable
	const prompt = textareaEl.value

	// Prevent the rest of the function from running, if prompt is empty
	if (prompt.length == 0) return

	// Disable multiple clicks on the button
	buttonEl.disabled = true
	buttonEl.textContent = 'Loading...'

	// Prepare request to OpenAI
	const data = {
		prompt,
		temperature: 0.5,
		max_tokens: 64,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0
	}

	// Request response from OpenAI
	fetch(`/getPrompt`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	})
	.then(response => response.json())
	.then(data => addDOMRes(prompt, data.text.trim()))
}

// Function for appending response from OpenAI to DOM
const addDOMRes = (prompt, res, preventStorage) => {
	// Get template and set elements to variable
	const template = templateEl.content.cloneNode(true)
	const promptEl = template.querySelector('.prompt')
	const resEl = template.querySelector('.res')

	// Set the content of the paragraphs
	promptEl.textContent = prompt
	resEl.textContent = res

	// Append response to DOM
	mainEl.insertBefore(template, h2El.nextElementSibling)
	noResEl.style.display = 'none'

	if (!preventStorage) {
		// Add response to local storage
		storedRes.push({ prompt, res })
		localStorage.setItem('responses', JSON.stringify(storedRes))

		// Reset the form
		textareaEl.value = ''
		buttonEl.disabled = false
		buttonEl.textContent = 'Submit'
	}
}