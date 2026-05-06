import { Skeleton } from '@/components/ui/skeleton';

export default function BuilderLoading() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title skeleton */}
        <div className="mb-10 flex flex-col items-center gap-3">
          <Skeleton className="h-7 w-36 rounded-full" />
          <Skeleton className="h-10 w-80" />
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main wizard skeleton */}
          <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 space-y-8">
            {/* Step indicator */}
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center flex-1">
                  <Skeleton className="h-9 w-9 rounded-full shrink-0" />
                  {i < 4 && <Skeleton className="flex-1 h-0.5 mx-2" />}
                </div>
              ))}
            </div>

            {/* Cards skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-white/10">
                  <Skeleton className="h-44 w-full rounded-none" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              ))}
            </div>

            {/* Nav skeleton */}
            <div className="flex justify-between pt-4 border-t border-white/10">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>

          {/* Summary sidebar skeleton */}
          <div className="hidden lg:block w-72 shrink-0">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-4">
              <Skeleton className="h-4 w-28" />
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-4 w-14" />
                </div>
              ))}
              <Skeleton className="h-px w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
