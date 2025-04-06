"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Search, Calendar, Clock, MapPin, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StudyJamPage() {
  const [activeTab, setActiveTab] = useState("discover")

  const upcomingJams = [
    {
      id: "1",
      title: "Psychology Study Group",
      date: "Mar 25, 2025",
      time: "6:00 PM - 8:00 PM",
      location: "Virtual",
      host: {
        name: "Alex Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      participants: 8,
      maxParticipants: 12,
      tags: ["Psychology", "Mental Health"],
    },
    {
      id: "2",
      title: "Mindfulness Meditation",
      date: "Mar 27, 2025",
      time: "7:00 PM - 8:30 PM",
      location: "Virtual",
      host: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      participants: 15,
      maxParticipants: 20,
      tags: ["Meditation", "Wellness"],
    },
    {
      id: "3",
      title: "Stress Management Techniques",
      date: "Mar 30, 2025",
      time: "5:30 PM - 7:00 PM",
      location: "Central Library, Room 302",
      host: {
        name: "Dr. Michael Brown",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      participants: 6,
      maxParticipants: 15,
      tags: ["Stress Relief", "Self-Care"],
    },
  ]

  const myJams = [
    {
      id: "4",
      title: "Positive Psychology Discussion",
      date: "Mar 22, 2025",
      time: "7:00 PM - 8:30 PM",
      location: "Virtual",
      host: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      participants: 5,
      maxParticipants: 10,
      tags: ["Psychology", "Positivity"],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Study Jam</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <Tabs defaultValue="discover" onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="discover">Discover Jams</TabsTrigger>
                <TabsTrigger value="my-jams">My Jams</TabsTrigger>
              </TabsList>

              <TabsContent value="discover" className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input placeholder="Search study jams..." className="pl-10" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="psychology">Psychology</SelectItem>
                      <SelectItem value="meditation">Meditation</SelectItem>
                      <SelectItem value="stress">Stress Management</SelectItem>
                      <SelectItem value="wellness">Wellness</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {upcomingJams.map((jam) => (
                    <Card key={jam.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{jam.title}</CardTitle>
                            <CardDescription>Hosted by {jam.host.name}</CardDescription>
                          </div>
                          <div className="flex gap-2">
                            {jam.tags.map((tag) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{jam.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{jam.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{jam.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {jam.participants}/{jam.maxParticipants} participants
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <div className="flex -space-x-2">
                          {[...Array(3)].map((_, i) => (
                            <Avatar key={i} className="border-2 border-background w-8 h-8">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" />
                              <AvatarFallback>U{i}</AvatarFallback>
                            </Avatar>
                          ))}
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-xs">
                            +{jam.participants - 3}
                          </div>
                        </div>
                        <Button>Join Jam</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="my-jams" className="space-y-6">
                <Button className="w-full sm:w-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Study Jam
                </Button>

                <div className="space-y-4">
                  {myJams.map((jam) => (
                    <Card key={jam.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{jam.title}</CardTitle>
                            <CardDescription>Hosted by {jam.host.name}</CardDescription>
                          </div>
                          <div className="flex gap-2">
                            {jam.tags.map((tag) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{jam.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{jam.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{jam.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {jam.participants}/{jam.maxParticipants} participants
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <div className="flex -space-x-2">
                          {[...Array(3)].map((_, i) => (
                            <Avatar key={i} className="border-2 border-background w-8 h-8">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" />
                              <AvatarFallback>U{i}</AvatarFallback>
                            </Avatar>
                          ))}
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-xs">
                            +{jam.participants - 3}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline">Edit</Button>
                          <Button>Manage</Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>{activeTab === "discover" ? "Join a Study Jam" : "Your Study Jam Stats"}</CardTitle>
                <CardDescription>
                  {activeTab === "discover"
                    ? "Connect with others who share your interests"
                    : "Track your participation and engagement"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {activeTab === "discover" ? (
                  <div className="space-y-4">
                    <p>Study Jams are collaborative sessions where you can:</p>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Connect with peers who share similar interests</li>
                      <li>Learn new techniques for mental well-being</li>
                      <li>Practice mindfulness and stress management together</li>
                      <li>Build a supportive community</li>
                    </ul>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Jams Hosted</span>
                      <span className="font-bold">1</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Jams Attended</span>
                      <span className="font-bold">5</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Total Hours</span>
                      <span className="font-bold">12.5</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span>Connections Made</span>
                      <span className="font-bold">8</span>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {activeTab === "discover" ? (
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your Own Jam
                  </Button>
                ) : (
                  <Button className="w-full" variant="outline">
                    View Detailed Stats
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

