"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageIcon, Search, Grid, Grid3X3 } from "lucide-react";
import { getPhotos } from "@/lib/memory-service";
import Link from "next/link";
import Image from "next/image";

export default function GalleryPage() {
    const [photos, setPhotos] = useState([]);
    const [filteredPhotos, setFilteredPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState("grid");
    const [selectedTag, setSelectedTag] = useState("all");
    const [availableTags, setAvailableTags] = useState([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const fetchedPhotos = await getPhotos();
                setPhotos(fetchedPhotos);
                setFilteredPhotos(fetchedPhotos);
                
                const tags = new Set();
                fetchedPhotos.forEach((photo) => {
                    photo.tags.forEach((tag) => tags.add(tag));
                });
                setAvailableTags(Array.from(tags));
            } catch (error) {
                console.error("Failed to fetch photos:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPhotos();
    }, []);

    useEffect(() => {
        let result = [...photos];
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter((photo) => {
                return photo.title.toLowerCase().includes(query) ||
                    photo.description?.toLowerCase().includes(query) ||
                    photo.tags.some((tag) => tag.toLowerCase().includes(query));
            });
        }
        if (selectedTag && selectedTag !== "all") {
            result = result.filter((photo) => photo.tags.includes(selectedTag));
        }
        setFilteredPhotos(result);
    }, [searchQuery, selectedTag, photos]);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <ImageIcon className="h-8 w-8 text-primary" />
                        <h1 className="text-3xl font-bold">Photo Gallery</h1>
                    </div>
                    <Button asChild>
                        <Link href="/memories/create">Add Photos</Link>
                    </Button>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input placeholder="Search photos..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
                    </div>

                    <div className="flex items-center gap-2">
                        <Select value={selectedTag} onValueChange={setSelectedTag}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by tag" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Photos</SelectItem>
                                {availableTags.map((tag) => (
                                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <div className="border rounded-md p-1 flex">
                            <Button variant={viewMode === "grid" ? "default" : "ghost"} size="icon" onClick={() => setViewMode("grid")} className="h-8 w-8">
                                <Grid className="h-4 w-4" />
                            </Button>
                            <Button variant={viewMode === "masonry" ? "default" : "ghost"} size="icon" onClick={() => setViewMode("masonry")} className="h-8 w-8">
                                <Grid3X3 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {Array(12).fill(0).map((_, i) => (
                            <div key={i} className="aspect-square bg-muted animate-pulse rounded-md"></div>
                        ))}
                    </div>
                ) : filteredPhotos.length === 0 ? (
                    <Card className="p-12 text-center">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <ImageIcon className="h-12 w-12 text-muted-foreground" />
                            <h2 className="text-2xl font-semibold">No Photos Found</h2>
                            <p className="text-muted-foreground mb-6">
                                {searchQuery || selectedTag !== "all"
                                    ? "Try adjusting your search or filter criteria"
                                    : "Add memories with photos to start building your gallery"}
                            </p>
                            {!searchQuery && selectedTag === "all" && (
                                <Button asChild>
                                    <Link href="/memories/create">Add Your First Photos</Link>
                                </Button>
                            )}
                        </div>
                    </Card>
                ) : (
                    <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" : "columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"}>
                        {filteredPhotos.map((photo) => (
                            <div key={photo.id} className={viewMode === "grid" ? "group aspect-square relative overflow-hidden rounded-md" : "break-inside-avoid mb-4"}>
                                <Link href={photo.memoryId ? `/memories/${photo.memoryId}` : `/gallery/${photo.id}`} className="block h-full">
                                    <Image src={photo.url || "/placeholder.svg"} alt={photo.title} width={viewMode === "grid" ? 500 : 300} height={viewMode === "grid" ? 500 : undefined} className={viewMode === "grid" ? "h-full w-full object-cover transition-transform group-hover:scale-105" : "w-full h-auto object-cover rounded-md"} />
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
