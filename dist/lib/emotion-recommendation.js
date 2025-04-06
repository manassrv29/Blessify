"use server";

import { getSuggestedMemoryForEmotion } from "./memory-service";
import { analyzeEmotionFromText } from "./emotion-analysis";

export function getMemoryRecommendation(text) {
    // Analyze the emotion from the text
    return analyzeEmotionFromText(text).then(function(emotion) {
        // If the primary emotion indicates distress or sadness, get a memory recommendation
        if (["sad", "anxious", "distressed"].includes(emotion.primaryEmotion.toLowerCase()) ||
            emotion.distressDetected ||
            emotion.intensity > 0.6) {
            return getSuggestedMemoryForEmotion(emotion.primaryEmotion);
        }
        return null;
    });
}
