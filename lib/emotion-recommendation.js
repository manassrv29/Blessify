"use server";
import { getSuggestedMemoryForEmotion } from "./memory-service";
import { analyzeEmotionFromText } from "./emotion-analysis";

export async function getMemoryRecommendation(text) {
    // Analyze the emotion from the text
    const emotion = await analyzeEmotionFromText(text);
    const primaryEmotion = emotion.primaryEmotion.toLowerCase();

    // Helper function to check distress conditions
    const isDistressed =
        ["sad", "anxious", "distressed"].includes(primaryEmotion) ||
        emotion.distressDetected ||
        emotion.intensity > 0.6;

    // Return memory recommendation if distress conditions are met
    return isDistressed ? await getSuggestedMemoryForEmotion(primaryEmotion) : null;
}

