const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini API
const genAI = new GoogleGenerativeAI("AIzaSyAPvRSgb2m9BFF_LhSchSI19PJ6okK6PhE");

async function handleChat(req, res) {
    try {
        const { message } = req.body;
        
        // Get Gemini model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        // Generate content
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();
        
        res.json({
            success: true,
            response: text
        });
    } catch (error) {
        console.error('Error in chat handler:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

module.exports = {
    handleChat
};