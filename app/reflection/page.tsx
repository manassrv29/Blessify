"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Brain, Save, ArrowRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function ReflectionPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<Record<string, string>>({})

  const reflectionPrompts = [
    {
      id: "gratitude",
      title: "Gratitude",
      question: "What are three things you're grateful for today?",
      placeholder: "I'm grateful for...",
    },
    {
      id: "challenge",
      title: "Challenge",
      question: "What was challenging for you today, and how did you handle it?",
      placeholder: "Today I faced...",
    },
    {
      id: "accomplishment",
      title: "Accomplishment",
      question: "What is something you accomplished or felt proud of today?",
      placeholder: "I accomplished...",
    },
    {
      id: "learning",
      title: "Learning",
      question: "What did you learn today about yourself or the world?",
      placeholder: "Today I learned...",
    },
    {
      id: "tomorrow",
      title: "Tomorrow",
      question: "What is one thing you're looking forward to tomorrow?",
      placeholder: "Tomorrow I'm looking forward to...",
    },
  ]

  const handleResponseChange = (id: string, value: string) => {
    setResponses({
      ...responses,
      [id]: value,
    })
  }

  const handleNext = () => {
    if (currentStep < reflectionPrompts.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSaveReflection = () => {
    console.log("Saving reflection:", responses)
    // In a real app, this would save to a database
    alert("Reflection saved successfully!")
  }

  const currentPrompt = reflectionPrompts[currentStep]
  const progress = ((currentStep + 1) / reflectionPrompts.length) * 100

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Brain className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Daily Reflection</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Mindful Reflection</CardTitle>
            <CardDescription>
              Take a few minutes to reflect on your day. This practice can help improve self-awareness and emotional
              well-being.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>
                  Step {currentStep + 1} of {reflectionPrompts.length}
                </span>
                <span>{currentPrompt.title}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">{currentPrompt.question}</h3>
              <Textarea
                placeholder={currentPrompt.placeholder}
                className="min-h-[150px]"
                value={responses[currentPrompt.id] || ""}
                onChange={(e) => handleResponseChange(currentPrompt.id, e.target.value)}
              />
            </div>

            {currentStep === reflectionPrompts.length - 1 && (
              <div className="space-y-4 border-t pt-4">
                <div className="space-y-2">
                  <Label htmlFor="reflection-title">Give your reflection a title</Label>
                  <Input
                    id="reflection-title"
                    placeholder="e.g., A Day of Growth"
                    value={responses.title || ""}
                    onChange={(e) => handleResponseChange("title", e.target.value)}
                  />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
              Previous
            </Button>
            <div>
              {currentStep === reflectionPrompts.length - 1 ? (
                <Button onClick={handleSaveReflection}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Reflection
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

