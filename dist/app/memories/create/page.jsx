"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addMemory } from "@/lib/memory-service";
import { uploadMultipleFiles } from "@/lib/upload-service";
import { CalendarDays, Upload, X } from "lucide-react";

export default function CreateMemoryPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        tags: "",
        images: null,
    });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewUrls, setPreviewUrls] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (!files) return;
        setFormData((prev) => ({ ...prev, images: files }));
        const newFiles = Array.from(files);
        setSelectedFiles(newFiles);
        const urls = newFiles.map((file) => URL.createObjectURL(file));
        setPreviewUrls(urls);
    };

    const removeFile = (index) => {
        setSelectedFiles((prev) => {
            const newFiles = [...prev];
            newFiles.splice(index, 1);
            return newFiles;
        });
        setPreviewUrls((prev) => {
            const newUrls = [...prev];
            URL.revokeObjectURL(newUrls[index]);
            newUrls.splice(index, 1);
            return newUrls;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            let imageUrls = [];
            if (formData.images && formData.images.length > 0) {
                imageUrls = await uploadMultipleFiles(formData.images);
            }

            const memory = {
                id: `memory_${Date.now()}`,
                title: formData.title,
                description: formData.description,
                date: new Date(formData.date),
                imageUrls: imageUrls,
                tags: formData.tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter((tag) => tag !== ""),
            };
            await addMemory(memory);
            router.push("/memories");
        } catch (error) {
            console.error("Failed to create memory:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <CalendarDays className="h-8 w-8 text-primary" />
                    <h1 className="text-3xl font-bold">Create New Memory</h1>
                </div>

                <Card>
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle>Capture Your Memory</CardTitle>
                            <CardDescription>Fill in the details to save this special moment</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="Give your memory a title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Describe this memory..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="min-h-[120px]"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input
                                    id="date"
                                    name="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tags">Tags (comma separated)</Label>
                                <Input
                                    id="tags"
                                    name="tags"
                                    placeholder="e.g., family, vacation, happy"
                                    value={formData.tags}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="images">Photos</Label>
                                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors">
                                    <Input
                                        id="images"
                                        name="images"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                    <Label htmlFor="images" className="cursor-pointer flex flex-col items-center gap-2">
                                        <Upload className="h-8 w-8 text-muted-foreground" />
                                        <span className="text-muted-foreground">
                                            {selectedFiles.length > 0
                                                ? `${selectedFiles.length} file(s) selected`
                                                : "Drag photos here or click to browse"}
                                        </span>
                                    </Label>
                                </div>

                                {previewUrls.length > 0 && (
                                    <div className="grid grid-cols-3 gap-2 mt-4">
                                        {previewUrls.map((url, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={url || "/placeholder.svg"}
                                                    alt={`Preview ${index}`}
                                                    className="h-24 w-full object-cover rounded-md"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute top-1 right-1 bg-background/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => removeFile(index)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button type="button" variant="outline" onClick={() => router.back()}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Creating..." : "Save Memory"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
