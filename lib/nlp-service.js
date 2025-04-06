// This is a mock service that would be replaced with a real NLP service in production
// In a real app, this would use a proper NLP library or API
export function analyzeJournalEntry(text) {
    // Simulate the analysis
    const lowerText = text.toLowerCase();
    // Very basic sentiment analysis
    const positiveWords = ["happy", "good", "great", "excellent", "joy", "love", "excited", "peaceful"];
    const negativeWords = [
        "sad", "bad", "terrible", "awful", "depressed", "anxious", "worried", "stressed", "angry", "hate", "suicidal", "kill", "die",
    ];
    const distressWords = [
        "hopeless", "worthless", "suicide", "kill myself", "end it all", "can't go on", "better off dead",
    ];
    let positiveCount = 0;
    let negativeCount = 0;
    let distressCount = 0;

    positiveWords.forEach((word) => {
        if (lowerText.includes(word)) positiveCount++;
    });
    negativeWords.forEach((word) => {
        if (lowerText.includes(word)) negativeCount++;
    });
    distressWords.forEach((word) => {
        if (lowerText.includes(word)) distressCount += 2; // Weight distress words more heavily
    });

    const totalWords = text.split(/\s+/).length;
    const sentiment = totalWords > 0 ? (positiveCount - negativeCount) / Math.sqrt(totalWords) : 0;

    // Calculate distress level (0-10)
    const distressLevel = Math.min(10, Math.max(0, negativeCount + distressCount * 2 - positiveCount));

    // Determine mood based on sentiment and distress
    let mood;
    if (distressLevel > 7) {
        mood = "Distressed";
    } else if (sentiment > 0.5) {
        mood = "Happy";
    } else if (sentiment > 0.2) {
        mood = "Content";
    } else if (sentiment > -0.2) {
        mood = "Neutral";
    } else if (sentiment > -0.5) {
        mood = "Sad";
    } else {
        mood = "Upset";
    }

    // Mock topics extraction
    const topics = [];
    if (lowerText.includes("work") || lowerText.includes("job") || lowerText.includes("career")) {
        topics.push("Work");
    }
    if (lowerText.includes("family") || lowerText.includes("parent") || lowerText.includes("child")) {
        topics.push("Family");
    }
    if (lowerText.includes("friend") || lowerText.includes("social") || lowerText.includes("relationship")) {
        topics.push("Relationships");
    }
    if (lowerText.includes("health") || lowerText.includes("sick") || lowerText.includes("doctor")) {
        topics.push("Health");
    }

    return {
        mood,
        distressLevel,
        topics: topics.length > 0 ? topics : ["General"],
        sentiment,
    };
}
