
const { Configuration, OpenAIApi } = require("openai");
const apiKey = `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`
// Set up your OpenAI API key
const configuration = new Configuration({
    apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

async function askQuestion(question) {
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-4",  // You can also use "gpt-3.5-turbo" if you have access
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: question },
            ],
            max_tokens: 150,  // Adjust the number of tokens as needed
            temperature: 0.7,  // Adjust the temperature to control the randomness of responses
        });

        const answer = response.data.choices[0].message.content.trim();
        return answer;
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
}

// Example usage
(async () => {
    const question = "What is the capital of France?";
    const answer = await askQuestion(question);
    console.log("Question:", question);
    console.log("Answer:", answer);
})();
