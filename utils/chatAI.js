function generateChatResponse(message, insights) {
    // Basic response based on wellness data and user input
    let response = "I'm here to help you with your health concerns.";

    if (message.includes("stress") && insights.stress_level > 5) {
        response = "I see your stress level is high. Try a few deep breathing exercises or consider a short break.";
    } else if (message.includes("hydration") && insights.hydration_level < 1) {
        response = "Your hydration level seems low. It's important to drink water regularly throughout the day.";
    } else if (message.includes("sleep") && insights.sleep_hours < 6) {
        response = "It looks like you might need more rest. Aim for at least 7-8 hours of sleep per night for optimal health.";
    } else if (message.includes("heart rate") && insights.heart_rate > 100) {
        response = "Your heart rate seems a bit elevated. If you're feeling unwell, consider speaking to a healthcare professional.";
    }

    return response;
}

module.exports = generateChatResponse;
