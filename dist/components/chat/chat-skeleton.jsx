import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
export default function ChatSkeleton() {
    return (<Card className="flex flex-col h-[600px] md:h-[700px] p-4">
      <div className="space-y-4 flex-1">
        <div className="flex gap-3 max-w-[80%] mr-auto">
          <Skeleton className="h-10 w-10 rounded-full"/>
          <Skeleton className="h-20 w-full rounded-lg"/>
        </div>

        <div className="flex gap-3 max-w-[80%] ml-auto">
          <Skeleton className="h-16 w-full rounded-lg"/>
          <Skeleton className="h-10 w-10 rounded-full"/>
        </div>

        <div className="flex gap-3 max-w-[80%] mr-auto">
          <Skeleton className="h-10 w-10 rounded-full"/>
          <Skeleton className="h-24 w-full rounded-lg"/>
        </div>
      </div>

      <div className="pt-4 border-t mt-4">
        <Skeleton className="h-[60px] w-full rounded-md"/>
      </div>
    </Card>);
}
