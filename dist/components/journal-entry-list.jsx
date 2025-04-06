import { formatDistanceToNow } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
export default function JournalEntryList({ entries }) {
    if (entries.length === 0) {
        return (<div className="text-center py-8 text-muted-foreground">
        No journal entries yet. Start writing to see your entries here.
      </div>);
    }
    return (<ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        {entries.map((entry) => (<div key={entry.id} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-medium">{formatDistanceToNow(entry.date, { addSuffix: true })}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${getMoodColor(entry.mood)}`}>{entry.mood}</span>
            </div>
            <p className="text-sm line-clamp-3 mb-2">{entry.text}</p>
            <Button variant="ghost" size="sm" className="w-full justify-between">
              View full entry
              <ChevronRight className="h-4 w-4"/>
            </Button>
          </div>))}
      </div>
    </ScrollArea>);
}
function getMoodColor(mood) {
    switch (mood.toLowerCase()) {
        case "happy":
        case "joyful":
        case "excited":
            return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
        case "calm":
        case "peaceful":
        case "relaxed":
            return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
        case "sad":
        case "melancholy":
        case "down":
            return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
        case "anxious":
        case "stressed":
        case "worried":
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
        case "angry":
        case "frustrated":
        case "irritated":
            return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
}
