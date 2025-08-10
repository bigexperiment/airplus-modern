export default function Loading() {
  return (
    <div className="container-px section">
      <div className="h-8 w-2/3 bg-white/10 rounded mb-4 animate-pulse" />
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="h-40 bg-white/5 rounded animate-pulse" />
          <div className="h-40 bg-white/5 rounded animate-pulse" />
          <div className="h-40 bg-white/5 rounded animate-pulse" />
        </div>
        <div className="space-y-4">
          <div className="h-40 bg-white/5 rounded animate-pulse" />
          <div className="h-40 bg-white/5 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}


