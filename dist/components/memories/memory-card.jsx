import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Eye } from "lucide-react";
export default function MemoryCard({ memory }) {
    const { id, title, date, description, imageUrls, tags } = memory;
    return (<Card className="overflow-hidden flex flex-col h-full hover:shadow-md transition-all">
      <div className="relative h-48">
        {imageUrls.length > 0 ? (<Image src={imageUrls[0] || "/placeholder.svg"} alt={title} fill className="object-cover"/>) : (<div className="h-full w-full flex items-center justify-center bg-muted">
            <CalendarDays className="h-12 w-12 text-muted-foreground"/>
          </div>)}
        {imageUrls.length > 1 && (<div className="absolute bottom-2 right-2 bg-background/80 text-foreground text-xs px-2 py-1 rounded-md">
            +{imageUrls.length - 1} more
          </div>)}
      </div>
      <CardContent className="flex-grow p-4">
        <div className="mb-2 text-sm text-muted-foreground">{formatDistanceToNow(date, { addSuffix: true })}</div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

        {tags.length > 0 && (<div className="flex flex-wrap gap-1 mt-3">
            {tags.map((tag) => (<span key={tag} className="text-xs bg-muted px-2 py-1 rounded-full">
                {tag}
              </span>))}
          </div>)}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild variant="outline" className="w-full">
          <Link href={`/memories/${id}`}>
            <Eye className="mr-2 h-4 w-4"/>
            View Memory
          </Link>
        </Button>
      </CardFooter>
    </Card>);
}
