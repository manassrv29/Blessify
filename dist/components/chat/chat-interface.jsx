"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@/hooks/use-chat";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2 } from "lucide-react";
import ChatMessage from "./chat-message";
import ChatSuggestions from "./chat-suggestions";
import { analyzeEmotionFromText } from "@/lib/emotion-analysis";
import { getMemoryRecommendation } from "@/lib/emotion-recommendation";
import MemoryRecommendation from "@/components/memories/memory-recommendation";

export default function ChatInterface() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
    const scrollAreaRef = useRef(null);
    const [userEmotion, setUserEmotion] = useState(null);
    const [recommendedMemory, setRecommendedMemory] = useState(null);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]");
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
        }
    }, [messages]);

    // Analyze emotion when user sends a message
    useEffect(() => {
        if (messages.length === 0) return;
        
        const analyzeLatestUserMessage = async () => {
            const userMessages = messages.filter((m) => m.role === "user");
            if (userMessages.length > 0) {
                const latestMessage = userMessages[userMessages.length - 1];
                const emotion = await analyzeEmotionFromText(latestMessage.content);
                setUserEmotion(emotion);
                
                if (["sad", "anxious"].includes(emotion.primaryEmotion.toLowerCase()) || emotion.distressDetected || emotion.intensity > 0.6) {
                    const memory = await getMemoryRecommendation(latestMessage.content);
                    setRecommendedMemory(memory);
                } else {
                    setRecommendedMemory(null);
                }
            }
        };
        analyzeLatestUserMessage();
    }, [messages]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSubmit(e);
    };

    const handleSuggestionClick = (suggestion) => {
        handleInputChange({ target: { value: suggestion } });
        setTimeout(() => handleSubmit(new Event("submit", { bubbles: true })), 100);
    };

    return (
        <Card className="flex flex-col h-[600px] md:h-[700px]">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                <div className="space-y-4 mb-4">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8">
                            <h3 className="text-lg font-medium mb-2">Welcome to Blessify Assistant</h3>
                            <p className="text-muted-foreground mb-6">
                                I'm here to support your mental well-being journey. How can I help you today?
                            </p>
                            <ChatSuggestions onSuggestionClick={handleSuggestionClick} />
                        </div>
                    ) : (
                        messages.map((message, index) => (
                            <ChatMessage key={index} message={message} emotion={message.role === "user" ? userEmotion : null} />
                        ))
                    )}
                    {recommendedMemory && (
                        <div className="px-4 mb-4">
                            <MemoryRecommendation memory={recommendedMemory} onDismiss={() => setRecommendedMemory(null)} />
                        </div>
                    )}
                    {isLoading && (
                        <div className="flex items-center justify-center py-4">
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        </div>
                    )}
                </div>
            </ScrollArea>

            <div className="p-4 border-t">
                <form onSubmit={handleFormSubmit} className="flex gap-2">
                    <Textarea
                        placeholder="Type your message here..."
                        value={input}
                        onChange={handleInputChange}
                        className="min-h-[60px] resize-none"
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey && input.trim()) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </Card>
    );
}
