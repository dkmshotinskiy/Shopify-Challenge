# Shopify Challenge

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->
- [Prompt](#prompt)
- [Technical requirements](#technical-requirements)
- [How to run?](#how-to-run)
<!-- /TOC -->

## Prompt
You will write an app that sends plain text prompts to the OpenAI API and displays the results in a list.

We'd like your app to have a simple-to-use interface that includes the following:
- A form for entering text prompts
- Submitting the form sends the prompt to the OpenAI API
- Results are displayed in a list, sorted from newest to oldest. Each result should include the original prompt and a response from the API.

## Technical requirements
- Results should come from OpenAI’s completions API, for which you’ll need a free API key (no credit card required). Detailed signup instructions are included below.
 	- We’ve provided screenshots below of demo apps we built using the OpenAI API.
	- We recommend using the “text-curie-001” AI engine which is a good balance between speed, cost, and accuracy (example code below).
	- You are free to use any front end framework/component library you like (or none at all!).
- Each result should include at least the original prompt you entered and the response from the API.
- Responses should be stored in order of newest to oldest.
- The HTML that ends up being served client-side should be accessible and semantic (MDN reference)

## How to run?
- Clone the repository.
- Run `npm i` or `yarn` command to install all dependencies.
- Run `npm start` or `yarn start` to start the server on port 7000.