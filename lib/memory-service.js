"use server";
import { revalidatePath } from "next/cache";

// Simulated database - replace with actual database in production
let memories = [];
let photos = [];

// Function to add a new memory (async required for Server Actions)
export async function addMemory(memory) {
    memories.push(memory);

    // If memory has images, add them to photos collection
    if (memory.imageUrls.length > 0) {
        memory.imageUrls.forEach((url, index) => {
            photos.push({
                id: `photo_${Date.now()}_${index}`,
                url,
                title: memory.title,
                description: memory.description,
                date: new Date(memory.date), // Ensure correct date format
                memoryId: memory.id,
                emotion: memory.emotion,
                tags: memory.tags,
            });
        });
    }

    // Revalidate paths after updating state
    revalidatePath("/memories");
    revalidatePath("/gallery");

    return memory;
}

// Function to get all memories
export async function getMemories() {
    return [...memories].sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Function to get a specific memory
export async function getMemory(id) {
    return memories.find((memory) => memory.id === id) || null;
}

// Function to update a memory
export async function updateMemory(updatedMemory) {
    const index = memories.findIndex((memory) => memory.id === updatedMemory.id);
    if (index !== -1) {
        memories[index] = { ...memories[index], ...updatedMemory };

        // Update associated photos
        photos = photos.map((photo) =>
            photo.memoryId === updatedMemory.id
                ? { ...photo, title: updatedMemory.title, description: updatedMemory.description, emotion: updatedMemory.emotion, tags: updatedMemory.tags }
                : photo
        );
    }

    revalidatePath("/memories");
    revalidatePath("/gallery");
    return updatedMemory;
}

// Function to delete a memory
export async function deleteMemory(id) {
    memories = memories.filter((memory) => memory.id !== id);
    photos = photos.filter((photo) => photo.memoryId !== id);
    
    revalidatePath("/memories");
    revalidatePath("/gallery");
}

// Function to get all photos
export async function getPhotos() {
    return [...photos].sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Function to get photos by emotion
export async function getPhotosByEmotion(emotion) {
    const normalizedEmotion = emotion.toLowerCase();
    const emotionMap = {
        sad: ["sad", "down", "blue", "depressed", "unhappy", "melancholy"],
        happy: ["happy", "joyful", "excited", "content", "pleased"],
        anxious: ["anxious", "worried", "nervous", "stressed"],
        angry: ["angry", "frustrated", "irritated", "annoyed"],
    };

    let targetEmotions = emotionMap[normalizedEmotion] || ["happy", "calm", "peaceful", "serene"];

    return photos.filter((photo) =>
        (photo.emotion && targetEmotions.includes(photo.emotion.toLowerCase())) ||
        photo.tags.some((tag) => targetEmotions.includes(tag.toLowerCase()))
    );
}

// Function to add a photo independently of a memory
export async function addPhoto(photo) {
    photos.push(photo);
    revalidatePath("/gallery");
    return photo;
}

// Function to get a memory suggestion based on emotion
export async function getSuggestedMemoryForEmotion(emotion) {
    const targetPhotos = await getPhotosByEmotion(emotion);
    const memoryIds = [...new Set(targetPhotos.map((photo) => photo.memoryId).filter(Boolean))];

    if (memoryIds.length > 0) {
        return await getMemory(memoryIds[Math.floor(Math.random() * memoryIds.length)]);
    }

    // Fallback: If no matching memories, return a positive memory
    const happyMemories = (await getMemories()).filter((memory) =>
        ["happy", "joy", "good", "positive"].some((tag) => memory.tags.includes(tag.toLowerCase()))
    );

    return happyMemories.length > 0 ? happyMemories[Math.floor(Math.random() * happyMemories.length)] : null;
}
