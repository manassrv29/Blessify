"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { CalendarDays, Clock, Image, Plus, Tag } from "lucide-react"
import { getMemories } from "@/lib/memory-service"
import MemoryCard from "@/components/memories/memory-card"
import type { Memory } from "@/types/memory"
import { formatDistanceToNow } from "date-fns"

export default function MemoriesPage() {
  const [memories, setMemories] = useState<Memory[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchMemories() {
      try {
        const fetchedMemories = await getMemories()
        setMemories(fetchedMemories)
      } catch (error) {
        console.error("Failed to fetch memories:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMemories()
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Memories</h1>
          </div>
          <Button asChild>
            <Link href="/memories/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Memory
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-48 bg-muted animate-pulse"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-muted animate-pulse rounded-md"></div>
                    <div className="h-3 bg-muted animate-pulse rounded-md w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : memories.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center justify-center gap-4">
              <Image className="h-12 w-12 text-muted-foreground" />
              <h2 className="text-2xl font-semibold">No Memories Yet</h2>
              <p className="text-muted-foreground mb-6">
                Start capturing your precious moments and create your first memory
              </p>
              <Button asChild>
                <Link href="/memories/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Memory
                </Link>
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memories.map((memory) => (
              <MemoryCard key={memory.id} memory={memory} />
            ))}
          </div>
        )}

        {memories.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Memory Timeline</h2>
            <div className="border-l-2 border-primary pl-6 ml-4 space-y-8">
              {memories.map((memory) => (
                <div key={`timeline-${memory.id}`} className="relative">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[calc(0.75rem+1px)]"></div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{formatDistanceToNow(memory.date, { addSuffix: true })}</span>
                    </div>
                    <h3 className="text-lg font-medium">
                      <Link href={`/memories/${memory.id}`} className="hover:underline">
                        {memory.title}
                      </Link>
                    </h3>
                    {memory.tags.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <Tag className="h-3 w-3 text-muted-foreground" />
                        {memory.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-muted px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

