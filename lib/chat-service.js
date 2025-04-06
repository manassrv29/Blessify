"use server";

import { revalidatePath } from "next/cache";

// In a real application, this would connect to a database
// For this example, we'll simulate storage with an in-memory array
let chatMessages = [];

export async function saveChatMessage(message) {
    // In a real app, this would save to a database
    chatMessages.push(message);
    // For demonstration purposes, we'll log the message
    console.log("Saved chat message:", message);
    // Revalidate the chat page to reflect new data
    revalidatePath("/chat");
}

export async function getChatHistory(chatId) {
    // In a real app, this would query a database
    return chatMessages.filter((message) => message.chatId === chatId);
}

export async function getRecentChats(limit = 10) {
    // Get unique chat IDs, sorted by most recent
    const uniqueChatIds = [
        ...new Set(chatMessages.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).map((message) => message.chatId)),
    ];
    return uniqueChatIds.slice(0, limit);
}

export async function deleteChat(chatId) {
    // In a real app, this would delete from a database
    chatMessages = chatMessages.filter((message) => message.chatId !== chatId);
    // Revalidate the chat page to reflect new data
    revalidatePath("/chat");
}
