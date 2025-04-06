"use server";
import { revalidatePath } from "next/cache";

// Simulated database - in a real app, these would be stored in a database
let memories = [];
let photos = [];

// Function to add a new memory
export function addMemory(memory) {
    memories.push(memory);
    // If memory has images, add them to photos collection
    if (memory.imageUrls.length > 0) {
        memory.imageUrls.forEach((url, index) => {
            const photo = {
                id: `photo_${Date.now()}_${index}`,
                url,
                title: memory.title,
                description: memory.description,
                date: memory.date,
                memoryId: memory.id,
                emotion: memory.emotion,
                tags: memory.tags,
            };
            photos.push(photo);
        });
    }
    revalidatePath("/memories");
    revalidatePath("/gallery");
    return Promise.resolve(memory);
}

// Function to get all memories
export function getMemories() {
    return Promise.resolve([...memories].sort((a, b) => b.date.getTime() - a.date.getTime()));
}

// Function to get a specific memory
export function getMemory(id) {
    return Promise.resolve(memories.find((memory) => memory.id === id));
}

// Function to update a memory
export function updateMemory(updatedMemory) {
    const index = memories.findIndex((memory) => memory.id === updatedMemory.id);
    if (index !== -1) {
        memories[index] = updatedMemory;
        // Update associated photos
        photos = photos.map((photo) => {
            if (photo.memoryId === updatedMemory.id) {
                return { ...photo, ...updatedMemory };
            }
            return photo;
        });
    }
    revalidatePath("/memories");
    revalidatePath("/gallery");
    return Promise.resolve(updatedMemory);
}

// Function to delete a memory
export function deleteMemory(id) {
    memories = memories.filter((memory) => memory.id !== id);
    photos = photos.filter((photo) => photo.memoryId !== id);
    revalidatePath("/memories");
    revalidatePath("/gallery");
    return Promise.resolve();
}

// Function to get all photos
export function getPhotos() {
    return Promise.resolve([...photos].sort((a, b) => b.date.getTime() - a.date.getTime()));
}

// Function to get photos by emotion
export function getPhotosByEmotion(emotion) {
    const normalizedEmotion = emotion.toLowerCase();
    const emotionMap = {
        sad: ["sad", "down", "blue", "depressed", "unhappy", "melancholy"],
        happy: ["happy", "joyful", "excited", "content", "pleased"],
        anxious: ["anxious", "worried", "nervous", "stressed"],
        angry: ["angry", "frustrated", "irritated", "annoyed"],
    };
    let targetEmotions = [];
    for (const [key, values] of Object.entries(emotionMap)) {
        if (values.includes(normalizedEmotion)) {
            if (key === "sad") {
                targetEmotions = emotionMap["happy"];
            } else if (key === "anxious") {
                targetEmotions = ["calm", "peaceful", "serene", ...emotionMap["happy"]];
            } else {
                targetEmotions = values;
            }
            break;
        }
    }
    if (targetEmotions.length === 0) {
        targetEmotions = [...emotionMap["happy"], "calm", "peaceful", "serene"];
    }
    return Promise.resolve(
        photos.filter((photo) => {
            const photoEmotion = photo.emotion?.toLowerCase();
            if (photoEmotion && targetEmotions.includes(photoEmotion)) {
                return true;
            }
            return photo.tags.some((tag) => targetEmotions.includes(tag.toLowerCase()));
        })
    );
}

// Function to add a photo independent of a memory
export function addPhoto(photo) {
    photos.push(photo);
    revalidatePath("/gallery");
    return Promise.resolve(photo);
}

// Function to get a memory suggestion based on emotion
export function getSuggestedMemoryForEmotion(emotion) {
    return getPhotosByEmotion(emotion).then((targetPhotos) => {
        if (targetPhotos.length > 0) {
            const memoryIds = targetPhotos.filter((photo) => photo.memoryId).map((photo) => photo.memoryId);
            if (memoryIds.length > 0) {
                const uniqueMemoryIds = [...new Set(memoryIds)];
                const randomMemoryId = uniqueMemoryIds[Math.floor(Math.random() * uniqueMemoryIds.length)];
                return getMemory(randomMemoryId).then((memory) => memory || null);
            }
        }
        return getMemories().then((allMemories) => {
            const happyMemories = allMemories.filter((memory) => {
                return (
                    memory.emotion?.toLowerCase() === "happy" ||
                    memory.tags.some((tag) => ["happy", "joy", "good", "positive"].includes(tag.toLowerCase()))
                );
            });
            if (happyMemories.length > 0) {
                return happyMemories[Math.floor(Math.random() * happyMemories.length)];
            }
            return null;
        });
    });
}
