"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    const { messages, input, handleInputChange, handleSubmit: originalHandleSubmit, isLoading, error, } = useAIChat({
        api: "/api/chat",
        onResponse: (response) => __awaiter(this, void 0, void 0, function* () {
            if (!response.ok) {
                toast({
                    title: "Error",
                    description: "There was a problem with the chat service. Please try again.",
                    variant: "destructive",
                });
            }
        }),
        onFinish: (message) => __awaiter(this, void 0, void 0, function* () {
            // Save the assistant's message to the database
            try {
                yield saveChatMessage({
                    chatId,
                    role: "assistant",
                    content: message.content,
                    timestamp: new Date(),
                });
            }
            catch (error) {
                console.error("Failed to save assistant message:", error);
            }
        }),
    });
    // Override handleSubmit to save user messages
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        if (!input.trim())
            return;
        // Save the user's message to the database before sending
        try {
            yield saveChatMessage({
                chatId,
                role: "user",
                content: input,
                timestamp: new Date(),
            });
        }
        catch (error) {
            console.error("Failed to save user message:", error);
        }
        // Call the original handleSubmit
        originalHandleSubmit(e);
    });
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
