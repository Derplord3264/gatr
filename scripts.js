import { HfInference } from "@huggingface/inference";

const client = new HfInference("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"); // Replace with your own API key

document.getElementById("estimateButton").addEventListener("click", async () => {
    const investment = document.getElementById("investment").value;
    if (!investment) {
        alert("Please enter an investment amount.");
        return;
    }

    const userMessage = `If I invest $${investment}, how much money could I potentially make in a year?`;
    
    try {
        const chatCompletion = await client.chatCompletion({
            model: "Qwen/Qwen2.5-Coder-32B-Instruct",
            messages: [{ role: "user", content: userMessage }],
            max_tokens: 500
        });

        document.getElementById("result").innerText = chatCompletion.choices[0].message.content;
    } catch (error) {
        console.error("Error fetching AI response:", error);
        document.getElementById("result").innerText = "An error occurred while estimating earnings.";
    }
});
