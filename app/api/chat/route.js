import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { analyzeEmotionFromText } from "@/lib/emotion-analysis";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        // Get the messages from the request
        const { messages } = await req.json();
        
        // Get the last user message for emotion analysis
        const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
        
        // Analyze the emotion if there's a user message
        let emotionContext = "";
        if (lastUserMessage) {
            const emotion = await analyzeEmotionFromText(lastUserMessage.content);
            
            // If distress is detected, prioritize support
            if (emotion.distressDetected) {
                emotionContext = `
                    The user appears to be in significant distress. Prioritize their well-being and safety.
                    Offer supportive resources and encourage them to seek professional help if needed.
                    Be compassionate and validating of their feelings.
                `;
            } else {
                // Otherwise, provide context based on their emotional state
                emotionContext = `
                    The user's message indicates they are feeling ${emotion.primaryEmotion} 
                    with an intensity of ${emotion.intensity.toFixed(2)}.
                    Tailor your response to acknowledge and address this emotional state appropriately.
                `;
            }
        }
        
        // Create a system message with context about the app and the user's emotional state
        const systemMessage = `
            You are Blessify Assistant, a supportive and empathetic AI companion focused on mental well-being.
            Your purpose is to provide emotional support, practical advice, and resources for mental wellness.
            
            Guidelines:
            - Be warm, compassionate, and non-judgmental in all interactions
            - Provide evidence-based information about mental health when appropriate
            - Suggest practical coping strategies and self-care techniques
            - Recognize your limitations and encourage professional help when needed
            - Keep responses concise and focused on the user's needs
            - Never diagnose medical conditions or replace professional mental health care
            
            ${emotionContext}
        `;
        
        // Generate a response using the AI SDK
        const { text } = await generateText({
            model: openai("gpt-4o"),
            system: systemMessage,
            prompt: lastUserMessage?.content || "Hello",
            temperature: 0.7,
            maxTokens: 500,
        });
        
        // Return the response
        return NextResponse.json({ message: text });
    } catch (error) {
        console.error("Chat API error:", error);
        return NextResponse.json({ error: "There was an error processing your request" }, { status: 500 });
    }
}
