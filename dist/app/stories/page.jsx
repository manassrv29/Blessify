import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Heart, Share2, BookmarkPlus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
export default function StoriesPage() {
    const featuredStory = {
        id: "1",
        title: "The Power of Small Wins",
        excerpt: "How celebrating minor achievements can lead to major breakthroughs in your mental well-being.",
        image: "/placeholder.svg?height=400&width=800",
        author: "Dr. Maya Richards",
        date: "Mar 15, 2025",
        readTime: "5 min read",
        tags: ["Motivation", "Self-Care"],
    };
    const stories = [
        {
            id: "2",
            title: "Finding Peace in Chaos",
            excerpt: "Techniques for maintaining calm and focus when life feels overwhelming.",
            image: "/placeholder.svg?height=300&width=500",
            author: "James Wilson",
            date: "Mar 10, 2025",
            readTime: "4 min read",
            tags: ["Mindfulness", "Stress Relief"],
        },
        {
            id: "3",
            title: "The Joy of Imperfection",
            excerpt: "Embracing your flaws and learning to love yourself completely.",
            image: "/placeholder.svg?height=300&width=500",
            author: "Sophia Chen",
            date: "Mar 8, 2025",
            readTime: "6 min read",
            tags: ["Self-Love", "Growth"],
        },
        {
            id: "4",
            title: "Rebuilding After Setbacks",
            excerpt: "How to bounce back stronger when life knocks you down.",
            image: "/placeholder.svg?height=300&width=500",
            author: "Marcus Johnson",
            date: "Mar 5, 2025",
            readTime: "7 min read",
            tags: ["Resilience", "Healing"],
        },
        {
            id: "5",
            title: "The Science of Happiness",
            excerpt: "Research-backed strategies to increase your daily joy and satisfaction.",
            image: "/placeholder.svg?height=300&width=500",
            author: "Dr. Emma Roberts",
            date: "Mar 1, 2025",
            readTime: "8 min read",
            tags: ["Science", "Happiness"],
        },
    ];
    return (<div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="h-8 w-8 text-primary"/>
          <h1 className="text-3xl font-bold">Uplifting Stories</h1>
        </div>

        <div className="mb-12">
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 relative h-[300px] md:h-auto">
                <Image src={featuredStory.image || "/placeholder.svg"} alt={featuredStory.title} fill className="object-cover"/>
              </div>
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex gap-2 mb-4">
                    {featuredStory.tags.map((tag) => (<Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>))}
                  </div>
                  <CardTitle className="text-2xl md:text-3xl mb-4">{featuredStory.title}</CardTitle>
                  <CardDescription className="text-base mb-4">{featuredStory.excerpt}</CardDescription>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <span>{featuredStory.author}</span>
                    <span>•</span>
                    <span>{featuredStory.date}</span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1"/>
                      {featuredStory.readTime}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Button asChild>
                    <Link href={`/stories/${featuredStory.id}`}>Read Story</Link>
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Heart className="h-5 w-5"/>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <BookmarkPlus className="h-5 w-5"/>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-5 w-5"/>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map((story) => (<Card key={story.id} className="overflow-hidden flex flex-col h-full">
              <div className="relative h-48">
                <Image src={story.image || "/placeholder.svg"} alt={story.title} fill className="object-cover"/>
              </div>
              <CardHeader>
                <div className="flex gap-2 mb-2">
                  {story.tags.map((tag) => (<Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>))}
                </div>
                <CardTitle>{story.title}</CardTitle>
                <CardDescription>{story.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{story.author}</span>
                  <span>•</span>
                  <span>{story.date}</span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1"/>
                    {story.readTime}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button asChild variant="outline">
                  <Link href={`/stories/${story.id}`}>Read Story</Link>
                </Button>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon">
                    <Heart className="h-4 w-4"/>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <BookmarkPlus className="h-4 w-4"/>
                  </Button>
                </div>
              </CardFooter>
            </Card>))}
        </div>
      </div>
    </div>);
}
