// This is a simplified emotion analysis function
// In a real application, this would use a more sophisticated NLP model
export function analyzeEmotionFromText(text) {
    // Define emotion keywords for basic analysis
    const emotionKeywords = {
        happy: ["happy", "joy", "excited", "great", "wonderful", "pleased", "delighted", "content"],
        sad: ["sad", "unhappy", "depressed", "down", "blue", "gloomy", "miserable", "upset"],
        angry: ["angry", "mad", "furious", "irritated", "annoyed", "frustrated", "enraged"],
        anxious: ["anxious", "worried", "nervous", "stressed", "tense", "uneasy", "afraid", "scared"],
        neutral: ["okay", "fine", "alright", "neutral", "normal"],
    };

    // Count occurrences of emotion keywords
    const emotionCounts = {
        happy: 0,
        sad: 0,
        angry: 0,
        anxious: 0,
        neutral: 0,
    };
    const lowerText = text.toLowerCase();

    // Count emotion keywords
    Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
        keywords.forEach((keyword) => {
            if (lowerText.includes(keyword)) {
                emotionCounts[emotion]++;
            }
        });
    });

    // Determine primary emotion
    let primaryEmotion = "neutral";
    let maxCount = 0;
    Object.entries(emotionCounts).forEach(([emotion, count]) => {
        if (count > maxCount) {
            maxCount = count;
            primaryEmotion = emotion;
        }
    });

    // Calculate intensity (0-1)
    const totalKeywords = Object.values(emotionCounts).reduce((sum, count) => sum + count, 0);
    const intensity = totalKeywords > 0 ? maxCount / totalKeywords : 0;

    // Check for specific distress signals
    const distressKeywords = ["suicide", "kill myself", "end it all", "can't go on", "hopeless", "worthless"];
    const distressSignals = distressKeywords.some((keyword) => lowerText.includes(keyword));

    return {
        primaryEmotion,
        intensity,
        distressDetected: distressSignals,
        timestamp: new Date(),
    };
}

// Function to get personalized response based on emotion
export function getPersonalizedResponse(emotion) {
    if (emotion.distressDetected) {
        return "I notice you may be experiencing significant distress. Remember that help is available. Would you like me to provide some resources for immediate support?";
    }

    switch (emotion.primaryEmotion) {
        case "happy":
            return "I'm glad to hear you're feeling positive! How can I help maintain this good energy?";
        case "sad":
            return "I understand you might be feeling down. Would you like to talk about what's bothering you, or perhaps try some mood-lifting activities?";
        case "angry":
            return "I can see you might be feeling frustrated. Would it help to talk through what's causing these feelings?";
        case "anxious":
            return "It sounds like you might be experiencing some anxiety. Would you like to try a quick breathing exercise to help calm your mind?";
        default:
            return "How can I support you today?";
    }
}
