"use client";

import { useState } from "react";
import { useChat as useAIChat } from "ai/react";
import { useToast } from "@/hooks/use-toast";
import { saveChatMessage } from "@/lib/chat-service";

export function useChat() {
    const { toast } = useToast();
    const [chatId, setChatId] = useState(() => {
        // Generate a unique ID for this chat session
        return `chat_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    });
    const { messages, input, handleInputChange, handleSubmit: originalHandleSubmit, isLoading, error } = useAIChat({
        api: "/api/chat",
        onResponse: async (response) => {
            if (!response.ok) {
                toast({
                    title: "Error",
                    description: "There was a problem with the chat service. Please try again.",
                    variant: "destructive",
                });
            }
        },
        onFinish: async (message) => {
            // Save the assistant's message to the database
            try {
                await saveChatMessage({
                    chatId,
                    role: "assistant",
                    content: message.content,
                    timestamp: new Date(),
                });
            } catch (error) {
                console.error("Failed to save assistant message:", error);
            }
        },
    });

    // Override handleSubmit to save user messages
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        // Save the user's message to the database before sending
        try {
            await saveChatMessage({
                chatId,
                role: "user",
                content: input,
                timestamp: new Date(),
            });
        } catch (error) {
            console.error("Failed to save user message:", error);
        }
        // Call the original handleSubmit
        originalHandleSubmit(e);
    };

    // Handle errors
    if (error) {
        toast({
            title: "Error",
            description: error.message || "An error occurred with the chat service.",
            variant: "destructive",
        });
    }

    return {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
    };
}
