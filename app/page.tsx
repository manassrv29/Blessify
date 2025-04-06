import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookHeart, Brain, Users, BookOpen, MessageCircleHeart, Sparkles, ImageIcon, Grid3X3 } from "lucide-react"

export default function Home() {
  const features = [
    {
      icon: <BookHeart className="h-8 w-8 text-primary" />,
      title: "Journal",
      description: "Record your daily thoughts and feelings with AI-powered emotional analysis.",
      link: "/journal",
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: "Mantras",
      description: "Discover positive affirmations to boost your mental well-being.",
      link: "/mantras",
    },
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "Reflection",
      description: "Take time to contemplate your thoughts and feelings.",
      link: "/reflection",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: "Stories",
      description: "Read uplifting stories designed to improve your mood.",
      link: "/stories",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Study Jam",
      description: "Connect with students who share similar interests for collaborative learning.",
      link: "/study-jam",
    },
    {
      icon: <MessageCircleHeart className="h-8 w-8 text-primary" />,
      title: "Emergency Contacts",
      description: "Set up contacts to be notified if you're experiencing distress.",
      link: "/emergency-contacts",
    },
    {
      icon: <MessageCircleHeart className="h-8 w-8 text-primary" />,
      title: "Chat Assistant",
      description: "Talk with our AI assistant for personalized support and guidance.",
      link: "/chat",
    },
    {
      icon: <ImageIcon className="h-8 w-8 text-primary" />,
      title: "Memories",
      description: "Capture and revisit your special moments through photos and descriptions.",
      link: "/memories",
    },
    {
      icon: <Grid3X3 className="h-8 w-8 text-primary" />,
      title: "Gallery",
      description: "Browse your photo collection and see all your treasured visuals in one place.",
      link: "/gallery",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
          Welcome to Blessify
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Your personal sanctuary for mental well-being. Journal your thoughts, find inspiration, and connect with
          others on your journey to a healthier mind.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
          >
            <Link href="/journal">Start Journaling</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Features to Enhance Your Well-being</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href={feature.link}>Explore {feature.title}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 py-16 rounded-2xl">
        <h2 className="text-3xl font-bold mb-6">Start Your Wellness Journey Today</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Join thousands of users who have improved their mental well-being with Blessify's comprehensive suite of
          tools.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
        >
          <Link href="/login">Sign Up Now</Link>
        </Button>
      </section>
    </div>
  )
}

