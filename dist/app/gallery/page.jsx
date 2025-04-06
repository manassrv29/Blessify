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
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch photos and tags on component mount
    const fetchPhotos = async () => {
      try {
        const fetchedPhotos = await getPhotos();
        setPhotos(fetchedPhotos);
        setFilteredPhotos(fetchedPhotos);
        
        // Extract unique tags
        const tags = new Set();
        fetchedPhotos.forEach((photo) => {
          photo.tags.forEach((tag) => tags.add(tag));
        });
        setAvailableTags(Array.from(tags));
      } catch (error) {
        console.error("Failed to fetch photos:", error);
        setError("There was an issue loading the photos. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  useEffect(() => {
    // Filter photos based on search query and selected tag
    let result = [...photos];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((photo) => {
        var _a;
        return (
          photo.title.toLowerCase().includes(query) ||
          ((_a = photo.description) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(query)) ||
          photo.tags.some((tag) => tag.toLowerCase().includes(query))
        );
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
            <ImageIcon className="h-8 w-8 text-primary" aria-hidden="true" />
            <h1 className="text-3xl font-bold">Photo Gallery</h1>
          </div>
          <Button asChild>
            <Link href="/memories/create" aria-label="Add photos to your gallery">
              Add Photos
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search photos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search photos"
            />
          </div>

          <div className="flex items-center gap-2">
            <Select value={selectedTag} onValueChange={setSelectedTag} aria-label="Filter by tag">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Photos</SelectItem>
                {availableTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="border rounded-md p-1 flex">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8"
                aria-label="Switch to grid view"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "masonry" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("masonry")}
                className="h-8 w-8"
                aria-label="Switch to masonry view"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array(12)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="aspect-square bg-muted animate-pulse rounded-md"></div>
              ))}
          </div>
        ) : error ? (
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center justify-center gap-4">
              <ImageIcon className="h-12 w-12 text-muted-foreground" />
              <h2 className="text-2xl font-semibold">Error</h2>
              <p className="text-muted-foreground mb-6">{error}</p>
            </div>
          </Card>
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
                  <Link href="/memories/create" aria-label="Add your first photos">
                    Add Your First Photos
                  </Link>
                </Button>
              )}
            </div>
          </Card>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                : "columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
            }
          >
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className={viewMode === "grid" ? "group aspect-square relative overflow-hidden rounded-md" : "break-inside-avoid mb-4"}
              >
                <Link
                  href={photo.memoryId ? `/memories/${photo.memoryId}` : `/gallery/${photo.id}`}
                  className="block h-full"
                  aria-label={`View photo titled ${photo.title}`}
                >
                  <Image
                    src={photo.url || "/placeholder.svg"}
                    alt={photo.title}
                    width={viewMode === "grid" ? 500 : 300}
                    height={viewMode === "grid" ? 500 : undefined}
                    className={viewMode === "grid" ? "h-full w-full object-cover transition-transform group-hover:scale-105" : "w-full h-auto object-cover rounded-md"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                    <h3 className="text-white font-medium text-sm line-clamp-1">{photo.title}</h3>
                    {photo.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {photo.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full text-white">
                            {tag}
                          </span>
                        ))}
                        {photo.tags.length > 3 && (
                          <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full text-white">
                            +{photo.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
