import { Skeleton } from '@/components/ui/skeleton';

export default function HomeLoading() {
  return (
    <div className="flex flex-col">
      {/* Hero skeleton */}
      <section className="min-h-[90vh] flex items-center justify-center px-4">
        <div className="w-full max-w-5xl mx-auto text-center space-y-6">
          <Skeleton className="h-8 w-40 mx-auto rounded-full" />
          <Skeleton className="h-16 w-3/4 mx-auto" />
          <Skeleton className="h-16 w-1/2 mx-auto" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
          <div className="flex gap-4 justify-center mt-8">
            <Skeleton className="h-14 w-40 rounded-xl" />
            <Skeleton className="h-14 w-40 rounded-xl" />
          </div>
          <Skeleton className="h-64 w-full max-w-3xl mx-auto rounded-2xl mt-20" />
        </div>
      </section>

      {/* Stats skeleton */}
      <section className="py-12 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center space-y-2">
                <Skeleton className="h-10 w-20 mx-auto" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products skeleton */}
      <section className="py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="flex justify-between mb-10">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-white/10">
              <Skeleton className="h-48 w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
