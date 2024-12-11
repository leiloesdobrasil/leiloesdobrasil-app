import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 p-2">
      <Skeleton className="h-[470px] w-[300px] rounded-xl" />
    </div>
  );
}
