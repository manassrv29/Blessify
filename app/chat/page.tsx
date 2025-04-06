"use client"

import { Suspense } from "react"
import { MessageCircleHeart } from "lucide-react"
import ChatInterface from "@/components/chat/chat-interface"
import ChatSkeleton from "@/components/chat/chat-skeleton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ChatPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <MessageCircleHeart className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Blessify Assistant</h1>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_300px]">
          <Suspense fallback={<ChatSkeleton />}>
            <ChatInterface />
          </Suspense>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About Blessify Assistant</CardTitle>
                <CardDescription>Your personal wellness companion</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Blessify Assistant is here to support your mental well-being journey. You can:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                  <li>Discuss your feelings and thoughts</li>
                  <li>Get personalized wellness suggestions</li>
                  <li>Learn coping strategies for stress and anxiety</li>
                  <li>Receive motivation and encouragement</li>
                  <li>Find resources for mental health support</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  Your conversations are private and secure. The assistant uses AI to understand your needs and provide
                  relevant support.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Suggested Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "How can I manage stress?",
                    "I need help with anxiety",
                    "Share a calming exercise",
                    "I'm feeling down today",
                    "Help me practice gratitude",
                  ].map((topic, index) => (
                    <li key={index}>
                      <button
                        className="text-sm text-left w-full px-3 py-2 rounded-md hover:bg-muted transition-colors"
                        onClick={() => {
                          // This will be handled by client component
                        }}
                      >
                        {topic}
                      </button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

