import { Card, CardContent, CardHeader } from "#/components";
import { Skeleton } from "#/components";

export default async function Loading() {
  return (
    <div className="w-full max-w-md p-8">
      <Card>
        <CardHeader className="space-y-1">
          <Skeleton className="h-8 w-48 mx-auto" />
          <Skeleton className="h-4 w-64 mx-auto mt-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-full mt-6" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
