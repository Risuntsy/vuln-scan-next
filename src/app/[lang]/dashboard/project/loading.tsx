import { Skeleton } from "#/components/ui/skeleton";

export default function ProjectsPageSkeleton() {
  return (
    <div className="flex flex-col h-full">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <Skeleton className="h-8 w-[150px] mb-2" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
        <Skeleton className="h-10 w-[180px]" />
      </div>

      {/* Content Skeleton */}
      <div className="p-6">
        <div className="rounded-md border bg-white"> {/* Mimic Card */}
          <div className="p-6">
            {/* Top Bar Skeleton */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-[250px]" />
                <Skeleton className="h-8 w-[100px]" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-[80px]" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>

            {/* Table Skeleton (without actual table elements) */}
            <div className="rounded-md border">
              {/* Table Header Row */}
              <div className="flex items-center border-b py-3 px-4">
                {["任务ID", "域名", "状态", "资产", "漏洞", "创建时间", "更新时间"].map((header, index) => (
                  <div key={index} className={`flex-1 ${index === 0 ? 'w-[100px]' : ''} mr-4`}>
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
                <div className="w-20 text-right"><Skeleton className="h-4 w-full" /></div> {/* Actions Column */}
              </div>

              {/* Table Body Rows */}
              {[...Array(7)].map((_, rowIndex) => (
                <div key={rowIndex} className="flex items-center py-4 px-4 border-b last:border-none">
                  {[...Array(7)].map((_, colIndex) => (
                    <div key={colIndex} className={`flex-1 mr-4`}>
                      <Skeleton className="h-6 w-full" />
                    </div>
                  ))}
                  <div className="w-20 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                      </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="flex items-center justify-between mt-4">
              <Skeleton className="h-4 w-[150px]" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}