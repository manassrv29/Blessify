import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
export default function ChatMessage({ message, emotion }) {
    const isUser = message.role === "user";
    return (<div className={cn("flex gap-3 max-w-[80%]", isUser ? "ml-auto" : "mr-auto")}>
      {!isUser && (<Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Blessify Assistant"/>
          <AvatarFallback>BA</AvatarFallback>
        </Avatar>)}

      <div className="flex flex-col">
        <div className={cn("rounded-lg px-4 py-2 text-sm", isUser ? "bg-primary text-primary-foreground" : "bg-muted")}>
          {message.content}
        </div>

        {isUser && emotion && (<div className="flex justify-end mt-1">
            <Badge variant="outline" className="text-xs">
              {emotion.primaryEmotion}
              {emotion.intensity > 0.7 && " (Strong)"}
            </Badge>
          </div>)}
      </div>

      {isUser && (<Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User"/>
          <AvatarFallback>U</AvatarFallback>
        </Avatar>)}
    </div>);
}
