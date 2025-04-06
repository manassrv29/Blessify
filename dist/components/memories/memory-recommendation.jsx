"use client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, X } from "lucide-react";
import { format } from "date-fns";
export default function MemoryRecommendation({ memory, onDismiss }) {
    return (<Card className="border-primary/50 bg-primary/5">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Remember This Moment?</CardTitle>
            <CardDescription>We thought this memory might lift your spirits</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onDismiss} className="h-8 w-8">
            <X className="h-4 w-4"/>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex gap-4">
          {memory.imageUrls.length > 0 && (<div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
              <Image src={memory.imageUrls[0] || "/placeholder.svg"} alt={memory.title} fill className="object-cover"/>
            </div>)}
          <div className="flex-grow">
            <h3 className="font-medium">{memory.title}</h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <CalendarDays className="h-3 w-3 mr-1"/>
              <span>{format(memory.date, "MMMM d, yyyy")}</span>
            </div>
            <p className="text-sm mt-1 line-clamp-2">{memory.description}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/memories/${memory.id}`}>View Memory</Link>
        </Button>
      </CardFooter>
    </Card>);
}
