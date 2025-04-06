"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { ArrowLeft, CalendarDays, Edit, Tag, Trash2 } from "lucide-react";
import { getMemory, deleteMemory } from "@/lib/memory-service";

export default function MemoryDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [memory, setMemory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchMemory = async () => {
            if (!params.id) return;
            try {
                const memoryData = await getMemory(params.id);
                if (!memoryData) return router.push("/memories");
                
                setMemory(memoryData);
                setSelectedImage(memoryData.imageUrls?.[0] || null);
            } catch (error) {
                console.error("Failed to fetch memory:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMemory();
    }, [params.id, router]);

    const handleDelete = async () => {
        if (!memory) return;
        if (!window.confirm("Are you sure you want to delete this memory?")) return;
        try {
            await deleteMemory(memory.id);
            router.push("/memories");
        } catch (error) {
            console.error("Failed to delete memory:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <p className="text-muted-foreground">Loading...</p>
            </div>
        );
    }

    if (!memory) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-semibold mb-4">Memory Not Found</h2>
                <p className="text-muted-foreground mb-6">This memory doesn't exist or was deleted.</p>
                <Button asChild>
                    <a href="/memories">Return to Memories</a>
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <Button variant="outline" onClick={() => router.back()}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <a href={`/memories/${memory.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </a>
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-2/3">
                            {memory.imageUrls?.length ? (
                                <>
                                    <div className="relative h-[400px] rounded-lg overflow-hidden">
                                        <Image src={selectedImage} alt={memory.title} fill className="object-cover" />
                                    </div>
                                    {memory.imageUrls.length > 1 && (
                                        <div className="mt-4 grid grid-cols-5 gap-2">
                                            {memory.imageUrls.map((url, index) => (
                                                <div
                                                    key={index}
                                                    className={`cursor-pointer rounded-md overflow-hidden h-16 relative ${url === selectedImage ? "ring-2 ring-primary" : ""}`}
                                                    onClick={() => setSelectedImage(url)}
                                                >
                                                    <Image src={url} alt={`${memory.title} - image ${index + 1}`} fill className="object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="md:w-2/3 bg-muted rounded-lg flex items-center justify-center h-[400px]">
                                    <CalendarDays className="h-24 w-24 text-muted-foreground opacity-50" />
                                </div>
                            )}
                        </div>

                        <div className="md:w-1/3">
                            <Card>
                                <CardContent className="p-6 space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Date</h3>
                                        <div className="flex items-center gap-2">
                                            <CalendarDays className="h-4 w-4 text-primary" />
                                            <span>{format(memory.date, "MMMM d, yyyy")}</span>
                                        </div>
                                    </div>

                                    {memory.tags?.length > 0 && (
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground mb-1">Tags</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {memory.tags.map((tag) => (
                                                    <div key={tag} className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full text-sm">
                                                        <Tag className="h-3 w-3" />
                                                        <span>{tag}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold mb-4">{memory.title}</h1>
                        <p className="whitespace-pre-line text-lg">{memory.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
