"use client";
import { Button } from "@/components/ui/button";
export default function ChatSuggestions({ onSuggestionClick }) {
    const suggestions = [
        "I'm feeling anxious today",
        "How can I improve my mood?",
        "I need help with stress management",
        "Can you suggest a mindfulness exercise?",
        "I'd like to talk about my feelings",
    ];
    return (<div className="flex flex-wrap gap-2 justify-center">
      {suggestions.map((suggestion, index) => (<Button key={index} variant="outline" size="sm" onClick={() => onSuggestionClick(suggestion)}>
          {suggestion}
        </Button>))}
    </div>);
}
