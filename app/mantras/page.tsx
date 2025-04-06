"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Heart, Share2, BookmarkPlus } from "lucide-react"

export default function MantrasPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])

  const toggleFavorite = (id: string) => {
    if (favoriteIds.includes(id)) {
      setFavoriteIds(favoriteIds.filter((favId) => favId !== id))
    } else {
      setFavoriteIds([...favoriteIds, id])
    }
  }

  const categories = [
    { id: "daily", name: "Daily Affirmations" },
    { id: "confidence", name: "Confidence" },
    { id: "gratitude", name: "Gratitude" },
    { id: "stress", name: "Stress Relief" },
    { id: "focus", name: "Focus & Study" },
  ]

  const mantras = {
    daily: [
      { id: "d1", text: "I am capable of amazing things." },
      { id: "d2", text: "Today I choose to be confident." },
      { id: "d3", text: "I am in charge of how I feel and today I choose happiness." },
      { id: "d4", text: "I have the power to create change." },
      { id: "d5", text: "I am becoming the best version of myself." },
    ],
    confidence: [
      { id: "c1", text: "I believe in myself and my abilities." },
      { id: "c2", text: "I am worthy of respect and acceptance." },
      { id: "c3", text: "I trust my intuition and make wise decisions." },
      { id: "c4", text: "I am confident in my unique gifts and talents." },
      { id: "c5", text: "I am enough just as I am." },
    ],
    gratitude: [
      { id: "g1", text: "I am thankful for all the blessings in my life." },
      { id: "g2", text: "I appreciate the small joys that each day brings." },
      { id: "g3", text: "I am grateful for the people who support and love me." },
      { id: "g4", text: "I find beauty in ordinary moments." },
      { id: "g5", text: "My heart is full of gratitude for all that I have." },
    ],
    stress: [
      { id: "s1", text: "I release all stress and tension from my body." },
      { id: "s2", text: "I am calm and centered in every situation." },
      { id: "s3", text: "I breathe in peace and breathe out stress." },
      { id: "s4", text: "I am in control of my thoughts and emotions." },
      { id: "s5", text: "This moment is temporary, and I have the strength to move through it." },
    ],
    focus: [
      { id: "f1", text: "I am focused and productive in all my tasks." },
      { id: "f2", text: "My mind is clear and ready to absorb new information." },
      { id: "f3", text: "I can accomplish anything I set my mind to." },
      { id: "f4", text: "I am disciplined and committed to my goals." },
      { id: "f5", text: "I am fully present and engaged in my learning." },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Mantras & Affirmations</h1>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Daily Mantra</CardTitle>
            <CardDescription>Start your day with this powerful affirmation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 p-8 rounded-lg text-center">
              <blockquote className="text-2xl font-serif italic">
                "I am the architect of my life; I build its foundation and choose its contents."
              </blockquote>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button variant="outline" size="sm">
              <Heart className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <BookmarkPlus className="mr-2 h-4 w-4" />
              Add to Collection
            </Button>
          </CardFooter>
        </Card>

        <Tabs defaultValue="daily" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(mantras).map(([categoryId, categoryMantras]) => (
            <TabsContent key={categoryId} value={categoryId} className="space-y-4">
              {categoryMantras.map((mantra) => (
                <Card key={mantra.id} className="overflow-hidden transition-all duration-300 hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <p className="text-lg">{mantra.text}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(mantra.id)}
                        className={favoriteIds.includes(mantra.id) ? "text-red-500" : ""}
                      >
                        <Heart className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/50 px-6 py-3">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                      <Button variant="ghost" size="sm">
                        <BookmarkPlus className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

