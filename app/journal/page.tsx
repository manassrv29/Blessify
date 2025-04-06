"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BookHeart, AlertTriangle, Save, Trash2 } from "lucide-react"
import { analyzeJournalEntry } from "@/lib/nlp-service"
import type { JournalEntry } from "@/types/journal"
import JournalEntryList from "@/components/journal-entry-list"
import { getMemoryRecommendation } from "@/lib/emotion-recommendation"
import type { Memory } from "@/types/memory"
import MemoryRecommendation from "@/components/memories/memory-recommendation"

export default function JournalPage() {
  const [journalText, setJournalText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [mood, setMood] = useState<string | null>(null)
  const [distressDetected, setDistressDetected] = useState(false)
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [recommendedMemory, setRecommendedMemory] = useState<Memory | null>(null)

  const handleJournalSubmit = async () => {
    if (!journalText.trim()) return

    setIsAnalyzing(true)

    try {
      // In a real app, this would call an actual NLP service
      const analysis = await analyzeJournalEntry(journalText)

      setMood(analysis.mood)
      setDistressDetected(analysis.distressLevel > 7)

      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        text: journalText,
        date: new Date(),
        mood: analysis.mood,
        distressLevel: analysis.distressLevel,
      }

      setEntries([newEntry, ...entries])

      // Check if a memory recommendation is needed based on mood
      if (
        analysis.distressLevel > 5 ||
        ["sad", "upset", "anxious", "stressed", "distressed"].includes(analysis.mood.toLowerCase())
      ) {
        const memory = await getMemoryRecommendation(journalText)
        setRecommendedMemory(memory)
      } else {
        setRecommendedMemory(null)
      }

      setJournalText("")
    } catch (error) {
      console.error("Error analyzing journal entry:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const clearJournal = () => {
    setJournalText("")
    setMood(null)
    setDistressDetected(false)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BookHeart className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Journal</h1>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>How are you feeling today?</CardTitle>
                <CardDescription>
                  Write freely about your thoughts and feelings. Our AI will analyze your entry to help you understand
                  your emotional state.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Start writing here..."
                  className="min-h-[200px] resize-none"
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={clearJournal} disabled={isAnalyzing}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear
                </Button>
                <Button onClick={handleJournalSubmit} disabled={!journalText.trim() || isAnalyzing}>
                  <Save className="mr-2 h-4 w-4" />
                  {isAnalyzing ? "Analyzing..." : "Save Entry"}
                </Button>
              </CardFooter>
            </Card>

            {distressDetected && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>We've detected signs of distress</AlertTitle>
                <AlertDescription>
                  Based on your journal entry, you might be experiencing significant distress. Would you like to contact
                  someone from your emergency contacts list?
                </AlertDescription>
                <div className="mt-4">
                  <Button variant="destructive" size="sm">
                    Contact Emergency Support
                  </Button>
                </div>
              </Alert>
            )}

            {mood && !distressDetected && (
              <Alert>
                <AlertTitle>Journal Analysis</AlertTitle>
                <AlertDescription>
                  Your current mood seems to be: <strong>{mood}</strong>
                </AlertDescription>
              </Alert>
            )}
            {recommendedMemory && (
              <MemoryRecommendation memory={recommendedMemory} onDismiss={() => setRecommendedMemory(null)} />
            )}
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Entries</CardTitle>
              </CardHeader>
              <CardContent>
                <JournalEntryList entries={entries} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

